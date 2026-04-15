from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, crud

router = APIRouter(prefix="/events", tags=["events"])
event_crud = crud.CRUDBase(models.Event)

@router.get("/", response_model=List[schemas.EventResponse])
def read_events(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return event_crud.get_multi(db, skip=skip, limit=limit)

@router.get("/{event_id}", response_model=schemas.EventResponse)
def read_event(event_id: int, db: Session = Depends(get_db)):
    db_event = event_crud.get(db, id=event_id)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return db_event

@router.post("/", response_model=schemas.EventResponse, status_code=201)
def create_event(event: schemas.EventCreate, db: Session = Depends(get_db)):
    return event_crud.create(db, obj_in=event)

@router.put("/{event_id}", response_model=schemas.EventResponse)
def update_event(event_id: int, event_update: schemas.EventUpdate, db: Session = Depends(get_db)):
    db_event = event_crud.get(db, id=event_id)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event_crud.update(db, db_obj=db_event, obj_in=event_update)

@router.delete("/{event_id}", status_code=204)
def delete_event(event_id: int, db: Session = Depends(get_db)):
    db_event = event_crud.delete(db, id=event_id)
    if not db_event:
        raise HTTPException(status_code=404, detail="Event not found")
    return