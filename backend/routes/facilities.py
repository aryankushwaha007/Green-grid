from fastapi import APIRouter, Body, HTTPException, status
from fastapi.encoders import jsonable_encoder
from typing import List

from backend.models import Facility
from backend.database import facility_collection

router = APIRouter()

@router.get("/", response_description="List all facilities", response_model=List[Facility])
async def list_facilities():
    facilities = await facility_collection.find().to_list(1000)
    return facilities

@router.get("/{id}", response_description="Get a single facility", response_model=Facility)
async def show_facility(id: str):
    if (facility := await facility_collection.find_one({"_id": id})) is not None:
        return facility
    raise HTTPException(status_code=404, detail=f"Facility {id} not found")

# Add more CRUD as needed
