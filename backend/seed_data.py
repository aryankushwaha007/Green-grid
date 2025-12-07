import asyncio
from backend.database import facility_collection
from datetime import datetime

facilities = [
    {
        "_id": "facility-001",
        "name": "Saudi Solar Complex A",
        "location": "Eastern Province",
        "capacity": 50,
        "type": "solar",
        "healthScore": 87,
        "efficiency": 92.3,
        "lastScan": datetime.utcnow(),
        "equipment": {
            "solar": { "status": "healthy", "degradation": 2.1 },
            "inverters": { "status": "healthy", "efficiency": 97.8 }
        }
    },
    {
        "_id": "facility-002",
        "name": "UAE Wind Farm North",
        "location": "Abu Dhabi",
        "capacity": 30,
        "type": "wind",
        "healthScore": 92,
        "efficiency": 88.7,
        "lastScan": datetime.utcnow(),
        "equipment": {
            "turbines": { "status": "warning", "bearing_health": 68 }
        }
    },
    {
        "_id": "facility-003",
        "name": "Egypt Hybrid Power Station",
        "location": "Cairo",
        "capacity": 75,
        "type": "hybrid",
        "healthScore": 79,
        "efficiency": 85.2,
        "lastScan": datetime.utcnow(),
        "equipment": {
            "solar": { "status": "warning", "degradation": 5.2 },
            "battery": { "status": "healthy", "charge": 78 }
        }
    }
]

async def seed_data():
    print("Seeding data...")
    for facility in facilities:
        await facility_collection.replace_one(
            {"_id": facility["_id"]}, 
            facility, 
            upsert=True
        )
    print("Data seeded successfully!")

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(seed_data())
