"""
Test YOLO model with verbose output to see raw predictions
"""
from ultralytics import YOLO
import cv2

# Load model
model = YOLO("best.pt")
print(f"Model: best.pt")
print(f"Classes: {model.names}\n")

# Load image
img = cv2.imread("Cracked-Solar-Panel-300x225.jpg")
print(f"Image shape: {img.shape}\n")

# Run inference with very low confidence and verbose output
print("Running inference with conf=0.001 (very low)...\n")
results = model(img, conf=0.001, iou=0.45, imgsz=640, verbose=True)

print(f"\n{'='*60}")
print("RAW RESULTS:")
print(f"{'='*60}")

for i, result in enumerate(results):
    print(f"\nResult {i}:")
    print(f"  Boxes: {result.boxes}")
    
    if result.boxes is not None:
        print(f"  Number of boxes: {len(result.boxes)}")
        print(f"  Boxes data: {result.boxes.data}")
        
        if len(result.boxes) > 0:
            for j, box in enumerate(result.boxes):
                print(f"\n  Box {j}:")
                print(f"    Class ID: {int(box.cls)}")
                print(f"    Class name: {model.names[int(box.cls)]}")
                print(f"    Confidence: {float(box.conf):.4f}")
                print(f"    BBox: {box.xyxy.tolist()[0]}")
        else:
            print("  No boxes detected even with conf=0.001")
    else:
        print("  Boxes is None")

print(f"\n{'='*60}\n")
