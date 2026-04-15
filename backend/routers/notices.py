from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, crud

router = APIRouter(prefix="/notices", tags=["notices"])
notice_crud = crud.CRUDBase(models.Notice)

@router.get("/", response_model=List[schemas.NoticeResponse])
def read_notices(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return notice_crud.get_multi(db, skip=skip, limit=limit)

@router.get("/{notice_id}", response_model=schemas.NoticeResponse)
def read_notice(notice_id: int, db: Session = Depends(get_db)):
    db_notice = notice_crud.get(db, id=notice_id)
    if not db_notice:
        raise HTTPException(status_code=404, detail="Notice not found")
    return db_notice

@router.post("/", response_model=schemas.NoticeResponse, status_code=201)
def create_notice(notice: schemas.NoticeCreate, db: Session = Depends(get_db)):
    return notice_crud.create(db, obj_in=notice)

@router.put("/{notice_id}", response_model=schemas.NoticeResponse)
def update_notice(notice_id: int, notice_update: schemas.NoticeUpdate, db: Session = Depends(get_db)):
    db_notice = notice_crud.get(db, id=notice_id)
    if not db_notice:
        raise HTTPException(status_code=404, detail="Notice not found")
    return notice_crud.update(db, db_obj=db_notice, obj_in=notice_update)

@router.delete("/{notice_id}", status_code=204)
def delete_notice(notice_id: int, db: Session = Depends(get_db)):
    db_notice = notice_crud.delete(db, id=notice_id)
    if not db_notice:
        raise HTTPException(status_code=404, detail="Notice not found")
    return
