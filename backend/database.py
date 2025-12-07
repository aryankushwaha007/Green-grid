import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_DETAILS = os.getenv("MONGO_DETAILS", "mongodb://localhost:27017")

client = AsyncIOMotorClient(MONGO_DETAILS)

database = client.greengrid

facility_collection = database.get_collection("facilities")
alert_collection = database.get_collection("alerts")
task_collection = database.get_collection("tasks")
detection_collection = database.get_collection("detections")
sensor_collection = database.get_collection("sensor_data")

def get_database():
    return database
