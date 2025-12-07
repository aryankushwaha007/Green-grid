# 🌍 GreenGrid - Renewable Energy Asset Management Dashboard

## 1. Project Overview
**GreenGrid** is a state-of-the-art predictive maintenance dashboard designed for renewable energy facilities (Solar, Wind, Hybrid) in the MENA region. It leverages AI/ML to detect defects in solar panels and analyze IoT sensor data to predict failures before they happen.

### Key Goals
-   **Centralized Monitoring**: View all energy assets on a single interactive map/dashboard.
-   **AI-Powered Defect Detection**: Upload drone imagery of solar panels to automatically detect defects (cracks, soiling) using YOLOv8.
-   **Intelligent Recommendations**: Use Google Gemini AI to provide actionable maintenance advice based on detection results.
-   **IoT Data Analysis**: Ingest sensor data (CSV) to track performance metrics like temperature, humidity, and power output.

---

## 2. System Architecture

The project follows a modern decoupled architecture:

### 2.1 Frontend (User Interface)
-   **Framework**: [Next.js 16.0.4](https://nextjs.org/) (App Router)
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS + shadcn/ui components
-   **State Management**: React Hooks (`useState`, `useEffect`)
-   **API Integration**: Native `fetch` with Next.js Rewrites for proxying.

### 2.2 Backend (API & Processing)
-   **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python)
-   **Database**: MongoDB (via `motor` async driver)
-   **ML Engine**: `ultralytics` (YOLOv8) for object detection.
-   **AI Engine**: `google-generativeai` (Gemini 2.0 Flash Exp) for text recommendations.
-   **Data Processing**: `pandas` for CSV ingestion.

### 2.3 Data Flow
1.  **User Action**: User uploads an image or CSV via the Dashboard.
2.  **Frontend**: Sends request to `/api/py/...` (Proxied to Backend).
3.  **Backend**:
    -   **Image**: Processed by YOLOv8 -> Detections -> Gemini for advice -> Saved to MongoDB.
    -   **CSV**: Parsed by Pandas -> Validated -> Saved to MongoDB.
4.  **Database**: Stores metadata, detection results, and sensor readings.
5.  **Response**: JSON data returned to Frontend for display.

---

## 3. Directory Structure

```
Antigravity/
├── .agent/                  # Agent Workflows
│   └── workflows/           # Custom workflow definitions
│       └── run-servers.md   # Workflow to run both servers
├── backend/                 # Python FastAPI Backend
│   ├── routes/              # API Endpoints
│   │   ├── facilities.py    # GET /facilities
│   │   └── upload.py        # POST /upload/image, /upload/csv
│   ├── database.py          # MongoDB Connection & Collections
│   ├── gemini_service.py    # Google Gemini AI Wrapper
│   ├── main.py              # App Entry Point & CORS
│   ├── ml_service.py        # YOLOv8 Detection Logic
│   ├── models.py            # Pydantic Data Models
│   ├── seed_data.py         # Script to populate dummy data
│   └── requirements.txt     # Python Dependencies
├── src/                     # Next.js Frontend
│   ├── app/                 # App Router Pages
│   │   ├── api/             # API Route Handlers
│   │   ├── dashboard/       # Main Dashboard Page
│   │   ├── design-system/   # Design System Documentation
│   │   ├── globals.css      # Global Styles
│   │   ├── layout.tsx       # Root Layout
│   │   └── page.tsx         # Home Page
│   ├── components/          # React Components
│   │   ├── dashboard/       # Dashboard-specific Components
│   │   ├── layout/          # Layout Components (Header, Sidebar)
│   │   └── ui/              # Reusable UI (shadcn)
│   ├── hooks/               # Custom React Hooks
│   └── lib/                 # Utilities
│       └── api.ts           # API Client Functions
├── public/                  # Static Assets
├── scripts/                 # Utility Scripts
├── .env                     # Environment Variables (API Keys, DB URL)
├── .gitignore               # Git Ignore Rules
├── best.pt                  # Custom YOLOv8 Model Weights
├── yolov8n.pt               # Default YOLOv8 Nano Model
├── components.json          # shadcn/ui Configuration
├── next.config.ts           # Next.js Config (Proxy Rewrites)
├── package.json             # Node.js Dependencies
├── tsconfig.json            # TypeScript Configuration
├── test_*.py                # Test Scripts
└── PROJECT_DOCUMENTATION.md # This File
```

---

## 4. Features in Detail

### 4.1 Dashboard
-   **KPI Cards**: Real-time view of Total Capacity, Active Alerts, and Efficiency.
-   **Facility Map/List**: Interactive list of facilities (Saudi Arabia, UAE, Egypt) with status indicators.
-   **Upload Center**: Dedicated tab for uploading inspection data.

### 4.2 AI Defect Detection
-   **Model**: YOLOv8 (You Only Look Once).
-   **Process**:
    1.  Uploads image to `POST /upload/image`.
    2.  Backend resizes and runs inference.
    3.  Returns Bounding Boxes, Class Labels, and Confidence Scores.
-   **Gemini Integration** (gemini-2.0-flash-exp):
    -   Takes the detection label (e.g., "Dust", "Crack").
    -   Prompts Gemini: *"A defect of type 'Dust' was detected... provide maintenance recommendation."*
    -   Returns: Immediate Action, Urgency, and Impact.
    -   Uses the latest Gemini 2.0 Flash Experimental model for faster, more accurate recommendations.

### 4.3 IoT Sensor Ingestion
-   **Format**: CSV files.
-   **Columns**: `timestamp`, `temperature`, `humidity`, `irradiance`, `power_output`.
-   **Storage**: Time-series data stored in MongoDB `sensor_data` collection.

---

## 5. Technical Implementation Details

### 5.1 Frontend-Backend Proxy
To avoid CORS issues and simplify development, we use Next.js Rewrites:
-   **Frontend Request**: `fetch('/api/py/upload/image')`
-   **Next.js Config**:
    ```typescript
    rewrites: async () => [{ source: '/api/py/:path*', destination: 'http://127.0.0.1:8000/:path*' }]
    ```
-   **Result**: The browser sees a same-origin request, while Next.js tunnels it to the Python backend.

### 5.2 Database Schema (MongoDB)
-   **Facilities**: Static metadata (Location, Capacity, Type).
-   **Detections**:
    ```json
    {
      "facility_id": "facility-001",
      "image_path": "uploads/panel_01.jpg",
      "detections": [{"class": "dust", "confidence": 0.95, "bbox": [...]}],
      "gemini_suggestion": "Clean immediately..."
    }
    ```
-   **SensorData**: Time-series records linked to a facility.

---

## 6. Setup & Installation

### Prerequisites
-   **Node.js** (v18+)
-   **Python** (v3.11+)
-   **MongoDB** (Local or Atlas)

### Step 1: Backend Setup
1.  Navigate to root: `cd Antigravity`
2.  Create/Activate Virtual Env:
    ```powershell
    python -m venv .venv
    .venv\Scripts\Activate.ps1
    ```
3.  Install Dependencies:
    ```powershell
    pip install -r backend/requirements.txt
    ```
4.  Setup Environment (`.env`):
    ```
    MONGO_DETAILS=mongodb://localhost:27017
    GEMINI_API_KEY=your_key_here
    ```
5.  Run Server:
    ```powershell
    python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
    ```

### Step 2: Frontend Setup
1.  Open new terminal.
2.  Install Dependencies: `npm install`
3.  Run Dev Server: `npm run dev`
4.  Open `http://localhost:3000/dashboard`.

### Step 3: Using Workflows
For convenience, you can use the custom workflow to run both servers:
```bash
/run-servers
```
This workflow will start both the backend and frontend servers simultaneously.

---

## 7. API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/facilities` | List all facilities |
| `GET` | `/facilities/{id}` | Get details for a specific facility |
| `POST` | `/upload/image` | Upload solar panel image for AI analysis |
| `POST` | `/upload/csv` | Upload sensor data CSV |

---

## 8. Testing

The project includes several test scripts for validating functionality:

### Available Test Scripts
-   **`test_detection.py`**: Tests the YOLOv8 defect detection pipeline end-to-end.
-   **`test_image_upload.py`**: Tests image upload functionality to the backend.
-   **`test_raw_detection.py`**: Tests raw YOLO model inference without API.
-   **`test_upload.py`**: General upload testing script.

### Running Tests
```powershell
# Activate virtual environment first
.venv\Scripts\Activate.ps1

# Run specific test
python test_detection.py
```

### Test Data
-   **`Cracked-Solar-Panel-300x225.jpg`**: Sample image for testing defect detection.
-   **`test.csv`**: Sample CSV file for testing sensor data ingestion.

---

## 9. Model Information

### YOLOv8 Models
The project includes two YOLO model files:
-   **`best.pt`** (31.7 MB): Custom-trained YOLOv8 model from Kaggle, specifically trained for solar panel defect detection.
-   **`yolov8n.pt`** (6.5 MB): Default YOLOv8 Nano model for general object detection.

The system uses the custom `best.pt` model for more accurate solar panel defect detection.

---

## 10. Workflows

The project includes custom workflows in `.agent/workflows/` for common tasks:

### Available Workflows
-   **`/run-servers`**: Starts both frontend (Next.js) and backend (FastAPI) servers simultaneously.

### Creating Custom Workflows
You can create additional workflows by adding `.md` files to `.agent/workflows/` following this format:
```markdown
---
description: [short title]
---
[specific steps]
```

---

## 11. Future Roadmap
-   [ ] **Authentication**: Add User Login/Signup (JWT).
-   [ ] **Real-time Weather**: Integrate OpenWeatherMap API.
-   [ ] **Advanced Visualization**: 3D Digital Twin of facilities.
-   [ ] **Alerts System**: Email/SMS notifications for critical defects.
-   [ ] **Mobile App**: Native iOS/Android applications.
-   [ ] **Predictive Analytics**: ML models for failure prediction.
-   [ ] **Multi-language Support**: Arabic, English, French.
