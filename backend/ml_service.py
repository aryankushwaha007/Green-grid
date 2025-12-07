import os
from ultralytics import YOLO
import cv2
import numpy as np

# Load model
# Try to load 'best.pt' if available, otherwise 'yolov8n.pt'
MODEL_PATH = "best.pt" if os.path.exists("best.pt") else "yolov8n.pt"
model = YOLO(MODEL_PATH)
print(f"✓ Model loaded: {MODEL_PATH}")
print(f"✓ Model task: {model.task}")
print(f"✓ Model classes: {model.names}")

def detect_defects(image_bytes):
    """
    Runs YOLO classification on the provided image bytes.
    Returns a list of classifications with probabilities.
    
    Note: This is a CLASSIFICATION model, not a detection model.
    It classifies the entire image rather than detecting objects with bounding boxes.
    """
    # Convert bytes to numpy array
    nparr = np.frombuffer(image_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    if img is None:
        print("ERROR: Failed to decode image")
        return []
    
    print(f"✓ Image decoded: shape={img.shape}, dtype={img.dtype}")

    # Run classification inference
    # For classification models, we don't use conf/iou parameters
    results = model(img, verbose=False)
    
    print(f"✓ Classification complete: {len(results)} result(s)")
    
    detections = []
    for result in results:
        # Classification models have 'probs' instead of 'boxes'
        if hasattr(result, 'probs') and result.probs is not None:
            probs = result.probs
            
            # Get top predictions (all classes with their probabilities)
            top_indices = probs.top5  # Top 5 class indices
            top_conf = probs.top5conf.tolist()  # Top 5 confidences
            
            print(f"✓ Classification results:")
            print(f"  Top class: {model.names[int(probs.top1)]} ({float(probs.top1conf):.2%})")
            
            # Return all top 5 predictions as "detections"
            for idx, conf in zip(top_indices, top_conf):
                class_name = model.names[int(idx)]
                confidence = float(conf)
                
                # Only include predictions with confidence > 0.01 (1%)
                if confidence > 0.01:
                    detection = {
                        "class": class_name,
                        "confidence": confidence,
                        "bbox": [0, 0, img.shape[1], img.shape[0]]  # Full image bbox for classification
                    }
                    detections.append(detection)
                    print(f"  - {class_name}: {confidence:.2%}")
        else:
            print("✗ No classification results (probs is None)")
    
    print(f"✓ Total classifications returned: {len(detections)}")
    return detections
