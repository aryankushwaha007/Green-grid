---
description: How to run both frontend and backend servers
---

# Running GreenGrid Application

The GreenGrid application consists of two servers that need to run simultaneously:
1. **Frontend** (Next.js) - Port 3000
2. **Backend** (FastAPI) - Port 8000

## Prerequisites

- Node.js and npm installed
- Python 3.8+ installed
- All dependencies installed

## Starting the Servers

### Option 1: Run Both Servers (Recommended)

Open **two separate terminal windows**:

**Terminal 1 - Backend Server:**
```powershell
cd c:\Users\Work\OneDrive\Desktop\Antigravity
.\scripts\start-backend.ps1
```

**Terminal 2 - Frontend Server:**
```powershell
cd c:\Users\Work\OneDrive\Desktop\Antigravity
npm run dev
```

### Option 2: Step-by-Step

#### 1. Start Backend First
```powershell
# Navigate to project directory
cd c:\Users\Work\OneDrive\Desktop\Antigravity

# Run the backend startup script
.\scripts\start-backend.ps1
```

The backend should start and display:
```
Starting FastAPI server on http://127.0.0.1:8000
```

#### 2. Start Frontend (in a new terminal)
```powershell
# Navigate to project directory
cd c:\Users\Work\OneDrive\Desktop\Antigravity

# Start Next.js development server
npm run dev
```

The frontend should start and display:
```
Ready on http://localhost:3000
```

## Verification

### Check Backend is Running
Open a browser and navigate to:
- http://127.0.0.1:8000/ - Should show: `{"message": "Welcome to GreenGrid API"}`
- http://127.0.0.1:8000/docs - Should show FastAPI interactive documentation

### Check Frontend is Running
Open a browser and navigate to:
- http://localhost:3000 - Should show the GreenGrid dashboard

### Test Image Upload
1. Navigate to the dashboard
2. Go to the upload section
3. Select a solar panel image
4. Click upload
5. Verify detection results appear

## Troubleshooting

### Backend Won't Start

**Error: "Python is not installed or not in PATH"**
- Install Python 3.8+ from python.org
- Ensure Python is added to system PATH

**Error: "Missing packages"**
- The script will automatically install missing packages
- If it fails, manually run: `pip install -r backend\requirements.txt`

**Error: "Port 8000 is already in use"**
- Check if another process is using port 8000
- Kill the process or use a different port

### Frontend Won't Connect to Backend

**Error: "Cannot connect to backend server"**
- Ensure backend is running on port 8000
- Check that both servers are running
- Verify no firewall is blocking port 8000

**Error: "Failed to upload image"**
- Check backend terminal for error messages
- Ensure YOLO model file exists (best.pt or yolov8n.pt)
- Verify MongoDB is running if using database features

### Image Upload Fails

**Error: "ML Service Error"**
- Check if YOLO model is properly loaded
- Verify image file is valid (JPEG, PNG)
- Check backend logs for detailed error

**Error: "Gemini API Error"**
- Ensure .env file exists with GEMINI_API_KEY
- Verify API key is valid
- Check internet connection

## Stopping the Servers

Press `Ctrl+C` in each terminal window to stop the respective server.

## Environment Variables

Create a `.env` file in the project root with:
```
GEMINI_API_KEY=your_api_key_here
MONGODB_URL=your_mongodb_connection_string
```

Note: The application will work without these, but some features may be limited.
