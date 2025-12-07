# GreenGrid Backend Startup Script
# This script starts the FastAPI backend server on port 8000

Write-Host "Starting GreenGrid Backend Server..." -ForegroundColor Green

# Navigate to project root
$projectRoot = Split-Path -Parent $PSScriptRoot
Set-Location $projectRoot

# Check if Python is installed
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Found: $pythonVersion" -ForegroundColor Cyan
} catch {
    Write-Host "Error: Python is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if virtual environment exists
if (Test-Path "venv\Scripts\Activate.ps1") {
    Write-Host "Activating virtual environment..." -ForegroundColor Cyan
    & "venv\Scripts\Activate.ps1"
} else {
    Write-Host "Warning: Virtual environment not found. Using global Python." -ForegroundColor Yellow
}

# Check if required packages are installed
Write-Host "Checking dependencies..." -ForegroundColor Cyan
$packages = @("fastapi", "uvicorn", "ultralytics", "google-generativeai")
$missingPackages = @()

foreach ($package in $packages) {
    $installed = python -c "import $($package.Replace('-', '_'))" 2>&1
    if ($LASTEXITCODE -ne 0) {
        $missingPackages += $package
    }
}

if ($missingPackages.Count -gt 0) {
    Write-Host "Missing packages detected: $($missingPackages -join ', ')" -ForegroundColor Yellow
    Write-Host "Installing from requirements.txt..." -ForegroundColor Cyan
    pip install -r backend\requirements.txt
}

# Check if .env file exists
if (-not (Test-Path ".env")) {
    Write-Host "Warning: .env file not found. Gemini API features may not work." -ForegroundColor Yellow
}

# Check if YOLO model exists
if (Test-Path "best.pt") {
    Write-Host "Found custom YOLO model: best.pt" -ForegroundColor Green
} else {
    Write-Host "Custom model not found. Will use default yolov8n.pt" -ForegroundColor Yellow
}

# Start the backend server
Write-Host "`nStarting FastAPI server on http://127.0.0.1:8000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Cyan

uvicorn backend.main:app --host 127.0.0.1 --port 8000 --reload
