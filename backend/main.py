from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, SessionLocal
import models
from routers import posts, events, documents, notices, tenders
from seed_data import seed_database

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Siyathemba Municipality API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(posts.router)
app.include_router(events.router)
app.include_router(documents.router)
app.include_router(notices.router)
app.include_router(tenders.router)

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
