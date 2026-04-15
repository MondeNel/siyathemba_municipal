import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from pathlib import Path

router = APIRouter(prefix="/uploads", tags=["uploads"])

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@router.post("/document")
async def upload_document(file: UploadFile = File(...)):
    # Validate file type
    allowed_extensions = {".pdf", ".doc", ".docx", ".txt", ".xls", ".xlsx"}
    ext = Path(file.filename).suffix.lower()
    if ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="File type not allowed")
    
    # Generate safe filename
    import uuid
    safe_name = f"{uuid.uuid4().hex}{ext}"
    file_path = UPLOAD_DIR / safe_name
    
    # Save file
    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Return URL (relative path)
    return {"file_url": f"/uploads/{safe_name}"}

@router.post("/tender")
async def upload_tender_document(file: UploadFile = File(...)):
    # Same as above, could be separate if needed
    return await upload_document(file)
