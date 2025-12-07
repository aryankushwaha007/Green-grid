"""
Test script to verify YOLO detection with different parameters
"""
from ultralytics import YOLO
import cv2
import sys

def test_detection(image_path, conf_threshold=0.1):
    """Test YOLO detection on an image with specified confidence threshold"""
    
    # Load model
    model = YOLO("best.pt")
    print(f"\n{'='*60}")
    print(f"Model: best.pt")
    print(f"Classes: {model.names}")
    print(f"{'='*60}\n")
    
    # Load image
    img = cv2.imread(image_path)
    if img is None:
        print(f"ERROR: Could not load image: {image_path}")
        return
    
    print(f"Image: {image_path}")
    print(f"Shape: {img.shape}")
    print(f"Confidence threshold: {conf_threshold}\n")
    
    # Run inference
    results = model(img, conf=conf_threshold, iou=0.45, imgsz=640, verbose=True)
    
    # Process results
    print(f"\n{'='*60}")
    print("DETECTION RESULTS:")
    print(f"{'='*60}")
    
    total_detections = 0
    for result in results:
        if result.boxes is not None and len(result.boxes) > 0:
            total_detections = len(result.boxes)
            print(f"\nFound {total_detections} detection(s):\n")
            
            for i, box in enumerate(result.boxes, 1):
                class_id = int(box.cls)
                confidence = float(box.conf)
                class_name = model.names[class_id]
                bbox = box.xyxy.tolist()[0]
                
                print(f"{i}. Class: {class_name}")
                print(f"   Confidence: {confidence:.2%}")
                print(f"   BBox: [{bbox[0]:.1f}, {bbox[1]:.1f}, {bbox[2]:.1f}, {bbox[3]:.1f}]\n")
        else:
            print("\nNo detections found.\n")
    
    print(f"{'='*60}")
    print(f"Total: {total_detections} detection(s)")
    print(f"{'='*60}\n")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python test_detection.py <image_path> [confidence_threshold]")
        print("Example: python test_detection.py test_image.jpg 0.1")
        sys.exit(1)
    
    image_path = sys.argv[1]
    conf = float(sys.argv[2]) if len(sys.argv) > 2 else 0.1
    
    test_detection(image_path, conf)
