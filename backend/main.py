from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import facilities, upload

app = FastAPI(title="GreenGrid API", version="1.0.0")

# CORS Setup
origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(facilities.router, tags=["Facilities"], prefix="/facilities")
app.include_router(upload.router, tags=["Upload"], prefix="/upload")

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to GreenGrid API"}
