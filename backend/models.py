from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict, Any
from datetime import datetime

class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not isinstance(v, str):
            raise TypeError('ObjectId must be a string')
        return v

class Facility(BaseModel):
    id: str = Field(..., alias="_id")
    name: str
    location: str
    capacity: float
    type: str
    healthScore: float
    efficiency: float
    lastScan: datetime
    equipment: Dict[str, Any]

    class Config:
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "id": "facility-001",
                "name": "Saudi Solar Farm A",
                "location": "Eastern Province",
                "capacity": 5,
                "type": "solar",
                "healthScore": 85,
                "efficiency": 94.2,
                "lastScan": "2025-11-26T23:45:00Z",
                "equipment": {
                    "solar": { "status": "healthy", "degradation": 2.3 },
                    "wind": { "status": "warning", "bearing": 67 },
                    "grid": { "status": "healthy", "frequency": 50.1 }
                }
            }
        }

class DetectionResult(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    facility_id: str
    image_path: str
    detections: List[Dict[str, Any]]  # YOLO output
    gemini_suggestion: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

class SensorData(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    facility_id: str
    timestamp: datetime
    temperature: float
    humidity: float
    irradiance: float
    power_output: float
    vibration: Optional[float] = None
