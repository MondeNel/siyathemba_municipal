from sqlalchemy import Column, Integer, String, Text, DateTime, func
from database import Base

class Post(Base):
    __tablename__ = "posts"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    author = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    date = Column(String, nullable=False)
    time = Column(String, nullable=False)
    location = Column(String, nullable=False)
    category = Column(String, nullable=False)
    created_at = Column(DateTime, server_default=func.now())

class Document(Base):
    __tablename__ = "documents"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    file_url = Column(String, nullable=False)
    category = Column(String, nullable=False)
    file_size = Column(String, nullable=False)
    file_type = Column(String, nullable=False)
    downloads = Column(Integer, default=0)
    created_at = Column(DateTime, server_default=func.now())

class Notice(Base):
    __tablename__ = "notices"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    urgency = Column(String, default="normal")
    file_url = Column(String, default="")
    created_at = Column(DateTime, server_default=func.now())

class Tender(Base):
    __tablename__ = "tenders"
    id = Column(Integer, primary_key=True, index=True)
    reference = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    closing_date = Column(String, nullable=False)
    status = Column(String, default="open")
    file_url = Column(String, default="")
    file_url = Column(String, default="")
    document_url = Column(String, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
