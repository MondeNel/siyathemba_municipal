from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database import engine, SessionLocal
import models
from routers import posts, events, documents, notices, tenders
from seed_data import seed_database
import os
import shutil
from datetime import datetime

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Siyathemba Municipality API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded files
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(posts.router)
app.include_router(events.router)
app.include_router(documents.router)
app.include_router(notices.router)
app.include_router(tenders.router)

# File upload endpoint
@app.post("/upload/{entity_type}")
async def upload_file(entity_type: str, file: UploadFile = File(...)):
    if entity_type not in ["document", "tender", "notice"]:
        raise HTTPException(400, "Invalid entity type")
    
    # Validate file type
    allowed_extensions = ['.pdf', '.doc', '.docx']
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in allowed_extensions:
        raise HTTPException(400, f"File type not allowed. Allowed: {', '.join(allowed_extensions)}")
    
    # Create unique filename
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_filename = f"{timestamp}_{file.filename}"
    upload_dir = f"uploads/{entity_type}s"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, safe_filename)
    
    # Save file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return URL path
    file_url = f"/uploads/{entity_type}s/{safe_filename}"
    return {"file_url": file_url, "filename": safe_filename, "size": os.path.getsize(file_path)}

@app.on_event("startup")
def on_startup():
    db = SessionLocal()
    try:
        seed_database(db)
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Siyathemba Municipality API", "docs": "/docs"}
