from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, crud

router = APIRouter(prefix="/documents", tags=["documents"])
doc_crud = crud.CRUDBase(models.Document)

@router.get("/", response_model=List[schemas.DocumentResponse])
def read_documents(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return doc_crud.get_multi(db, skip=skip, limit=limit)

@router.get("/{doc_id}", response_model=schemas.DocumentResponse)
def read_document(doc_id: int, db: Session = Depends(get_db)):
    db_doc = doc_crud.get(db, id=doc_id)
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_doc

@router.post("/", response_model=schemas.DocumentResponse, status_code=201)
def create_document(doc: schemas.DocumentCreate, db: Session = Depends(get_db)):
    return doc_crud.create(db, obj_in=doc)

@router.put("/{doc_id}", response_model=schemas.DocumentResponse)
def update_document(doc_id: int, doc_update: schemas.DocumentUpdate, db: Session = Depends(get_db)):
    db_doc = doc_crud.get(db, id=doc_id)
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc_crud.update(db, db_obj=db_doc, obj_in=doc_update)

@router.delete("/{doc_id}", status_code=204)
def delete_document(doc_id: int, db: Session = Depends(get_db)):
    db_doc = doc_crud.delete(db, id=doc_id)
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return
