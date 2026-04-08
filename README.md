# Resume Analyzer - Django + React Integration

A full-stack application that analyzes resumes against job descriptions using a Django backend and a React (Vite) frontend.

## Project Structure

- **backend/**: Django application (API)
- **frontend/**: React + Tailwind CSS application

---

## Backend Setup (Django)

### 1. Prerequisites
- Python 3.10+
- Virtual environment (recommended)

### 2. Installation
```bash
cd backend
python -m venv venv
# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
# Install dependencies
pip install -r requirements.txt
```

### 3. Database & Server
```bash
# Run migrations (from backend directory)
cd backend
# Set PYTHONPATH to parent directory
export PYTHONPATH=..
# On Windows PowerShell: $env:PYTHONPATH = ".."
python manage.py migrate

# Start the server
python manage.py runserver 0.0.0.0:8000
```
The backend will run at `http://localhost:8000`.

---

## Running the Application

### Backend
```bash
cd backend
# Activate the virtual environment
venv\Scripts\activate  # On Windows
# source venv/bin/activate  # On macOS/Linux
export PYTHONPATH=..
python manage.py runserver 0.0.0.0:8000
```

### Frontend
```bash
cd frontend
npm run dev
```
The frontend will run at `http://localhost:5173`.

---

## Deployment

### Backend (Django) on Render

1. Create a new Web Service on Render, connecting your GitHub repository.
2. Set the **Root Directory** to `backend` (this is where `manage.py` is located).
3. Configure the build settings:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python manage.py migrate && gunicorn backend.wsgi:application --bind 0.0.0.0:$PORT`
4. Add environment variables if needed (e.g., `DJANGO_SETTINGS_MODULE=backend.settings`).
5. Deploy the service.

### Frontend (React) on Render

1. Create a new Static Site on Render.
2. Set the **Root Directory** to `frontend`.
3. Configure the build settings:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variable: `VITE_API_BASE_URL` set to your backend's Render URL (e.g., `https://your-backend.onrender.com`).
5. Deploy the site.

Ensure CORS is properly configured in Django settings for the frontend URL.

---

## Key Features & Integration

### 1. Prerequisites
- Node.js (v18+)

### 2. Installation
```bash
cd frontend
npm install
```

### 3. Environment Configuration
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:8000
```

### 4. Development Server
```bash
npm run dev
```
The frontend will run at `http://localhost:5173`.

---

## Key Features & Integration

- **File Upload**: Supports `.pdf` and `.docx` formats.
- **Skill Extraction**: Automatically identifies technical skills from resumes.
- **JD Matching**: Dynamically matches resume skills against the provided Job Description.
- **Interactive Dashboard**: Visualizes match scores, matched skills, and missing requirements.
- **CORS Enabled**: Backend is configured to allow requests from frontend devs.
