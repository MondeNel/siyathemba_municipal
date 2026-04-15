from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
import models, schemas, crud

router = APIRouter(prefix="/posts", tags=["posts"])
post_crud = crud.CRUDBase(models.Post)

@router.get("/", response_model=List[schemas.PostResponse])
def read_posts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return post_crud.get_multi(db, skip=skip, limit=limit)

@router.get("/{post_id}", response_model=schemas.PostResponse)
def read_post(post_id: int, db: Session = Depends(get_db)):
    db_post = post_crud.get(db, id=post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@router.post("/", response_model=schemas.PostResponse, status_code=201)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db)):
    return post_crud.create(db, obj_in=post)

@router.put("/{post_id}", response_model=schemas.PostResponse)
def update_post(post_id: int, post_update: schemas.PostUpdate, db: Session = Depends(get_db)):
    db_post = post_crud.get(db, id=post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post_crud.update(db, db_obj=db_post, obj_in=post_update)

@router.delete("/{post_id}", status_code=204)
def delete_post(post_id: int, db: Session = Depends(get_db)):
    db_post = post_crud.delete(db, id=post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    return
