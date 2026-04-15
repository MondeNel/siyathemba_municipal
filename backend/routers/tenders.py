from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, crud

router = APIRouter(prefix="/tenders", tags=["tenders"])
tender_crud = crud.CRUDBase(models.Tender)

@router.get("/", response_model=List[schemas.TenderResponse])
def read_tenders(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return tender_crud.get_multi(db, skip=skip, limit=limit)

@router.get("/{tender_id}", response_model=schemas.TenderResponse)
def read_tender(tender_id: int, db: Session = Depends(get_db)):
    db_tender = tender_crud.get(db, id=tender_id)
    if not db_tender:
        raise HTTPException(status_code=404, detail="Tender not found")
    return db_tender

@router.post("/", response_model=schemas.TenderResponse, status_code=201)
def create_tender(tender: schemas.TenderCreate, db: Session = Depends(get_db)):
    return tender_crud.create(db, obj_in=tender)

@router.put("/{tender_id}", response_model=schemas.TenderResponse)
def update_tender(tender_id: int, tender_update: schemas.TenderUpdate, db: Session = Depends(get_db)):
    db_tender = tender_crud.get(db, id=tender_id)
    if not db_tender:
        raise HTTPException(status_code=404, detail="Tender not found")
    return tender_crud.update(db, db_obj=db_tender, obj_in=tender_update)

@router.delete("/{tender_id}", status_code=204)
def delete_tender(tender_id: int, db: Session = Depends(get_db)):
    db_tender = tender_crud.delete(db, id=tender_id)
    if not db_tender:
        raise HTTPException(status_code=404, detail="Tender not found")
    return
