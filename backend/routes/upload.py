from fastapi import APIRouter, UploadFile, File, HTTPException
from backend.ml_service import detect_defects
from backend.gemini_service import get_recommendation
from backend.database import detection_collection, sensor_collection
from backend.models import DetectionResult, SensorData
import pandas as pd
import io
from datetime import datetime

router = APIRouter()

@router.post("/image", response_description="Upload solar panel image for detection")
async def upload_image(file: UploadFile = File(...), facility_id: str = "facility-001"):
    contents = await file.read()
    
    # 1. Run YOLO Detection
    try:
        print(f"\n{'='*60}")
        print(f"Processing image: {file.filename}")
        print(f"File size: {len(contents)} bytes")
        print(f"Facility ID: {facility_id}")
        print(f"{'='*60}")
        
        detections = detect_defects(contents)
        
        print(f"\n{'='*60}")
        print(f"Detection Summary:")
        print(f"  Total detections: {len(detections)}")
        if detections:
            for i, det in enumerate(detections, 1):
                print(f"  {i}. {det['class']} - {det['confidence']:.2%}")
        print(f"{'='*60}\n")
        
    except Exception as e:
        print(f"ML Service Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"ML Service Error: {str(e)}")

    # 2. Get Gemini Recommendation
    suggestion = "No defects detected. Panel appears to be in good condition."
    
    if detections:
        # Filter out "Clean" class and get the most confident defect
        defects = [d for d in detections if d['class'].lower() != 'clean']
        
        if defects:
            # Sort by confidence and get the most confident defect
            defects.sort(key=lambda x: x['confidence'], reverse=True)
            top_defect = defects[0]
            print(f"Generating Gemini suggestion for: {top_defect['class']} ({top_defect['confidence']:.2%})")
            suggestion = get_recommendation(top_defect['class'], top_defect['confidence'])
        else:
            # All detections are "Clean"
            suggestion = "Panel is clean and in good condition. No maintenance required."
    
    # 3. Save to DB
    detection_result = DetectionResult(
        facility_id=facility_id,
        image_path=f"uploads/{file.filename}", # Placeholder path
        detections=detections,
        gemini_suggestion=suggestion
    )
    
    result_dict = detection_result.dict(by_alias=True)
    if result_dict.get("_id") is None:
        del result_dict["_id"]
    
    new_detection = await detection_collection.insert_one(result_dict)
    created_detection = await detection_collection.find_one({"_id": new_detection.inserted_id})
    created_detection["_id"] = str(created_detection["_id"])
    
    print(f"✓ Detection saved to database with ID: {created_detection['_id']}")
    return created_detection

@router.post("/csv", response_description="Upload IoT sensor CSV")
async def upload_csv(file: UploadFile = File(...), facility_id: str = "facility-001"):
    contents = await file.read()
    
    try:
        print(f"Processing CSV: {file.filename}, size: {len(contents)} bytes")
        df = pd.read_csv(io.BytesIO(contents))
        # Expected columns: timestamp, temperature, humidity, irradiance, power_output
        print(f"CSV Columns: {df.columns.tolist()}")
        
        records = []
        for index, row in df.iterrows():
            record = SensorData(
                facility_id=facility_id,
                timestamp=pd.to_datetime(row.get('timestamp', datetime.now())),
                temperature=row.get('temperature', 0.0),
                humidity=row.get('humidity', 0.0),
                irradiance=row.get('irradiance', 0.0),
                power_output=row.get('power_output', 0.0),
                vibration=row.get('vibration', 0.0)
            )
            record_dict = record.dict(by_alias=True)
            if record_dict.get("_id") is None:
                del record_dict["_id"]
            records.append(record_dict)
            
        if records:
            print(f"Inserting {len(records)} records")
            await sensor_collection.insert_many(records)
            
        return {"message": f"Successfully processed {len(records)} records."}
        
    except Exception as e:
        print(f"CSV Processing Error: {str(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=400, detail=f"CSV Processing Error: {str(e)}")
