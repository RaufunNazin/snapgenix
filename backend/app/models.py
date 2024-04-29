# backend/app/models.py
from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: Optional[int]
    username: str
    email: str
    hashed_password: str

class Photo(BaseModel):
    id: Optional[int]
    title: str
    description: str
    category: str
    image_link: str

class Booking(BaseModel):
    id: Optional[int]
    user_id: int
    service_type: str
    date: str
    status: str
