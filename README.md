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
# Install dependencies
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### 3. Database & Server (Direct Execution)
You do NOT need to activate the virtual environment. Use Python directly:
```bash
# Run migrations
python backend/manage.py migrate

# Start the server
python backend/manage.py runserver 0.0.0.0:8000
```
The backend will run at `http://localhost:8000`.

---

## Frontend Setup (React)

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
