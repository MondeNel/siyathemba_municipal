from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# Post Schemas
class PostBase(BaseModel):
    title: str
    content: str
    category: str
    author: str

class PostCreate(PostBase):
    pass

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    author: Optional[str] = None

class PostResponse(PostBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Event Schemas
class EventBase(BaseModel):
    title: str
    description: str
    date: str
    time: str
    location: str
    category: str

class EventCreate(EventBase):
    pass

class EventUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    date: Optional[str] = None
    time: Optional[str] = None
    location: Optional[str] = None
    category: Optional[str] = None

class EventResponse(EventBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Document Schemas
class DocumentBase(BaseModel):
    title: str
    description: str
    file_url: str
    category: str
    file_size: str
    file_type: str
    downloads: int = 0

class DocumentCreate(DocumentBase):
    pass

class DocumentUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    file_url: Optional[str] = None
    category: Optional[str] = None
    file_size: Optional[str] = None
    file_type: Optional[str] = None
    downloads: Optional[int] = None

class DocumentResponse(DocumentBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Notice Schemas
class NoticeBase(BaseModel):
    title: str
    content: str
    category: str
    urgency: str = "normal"

class NoticeCreate(NoticeBase):
    pass

class NoticeUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    category: Optional[str] = None
    urgency: Optional[str] = None

class NoticeResponse(NoticeBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True

# Tender Schemas
class TenderBase(BaseModel):
    reference: str
    title: str
    description: str
    category: str
    closing_date: str
    status: str = "open"

class TenderCreate(TenderBase):
    pass

class TenderUpdate(BaseModel):
    reference: Optional[str] = None
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    closing_date: Optional[str] = None
    status: Optional[str] = None

class TenderResponse(TenderBase):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True
