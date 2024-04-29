# backend/app/photo/photo.py
from fastapi import APIRouter, Depends, HTTPException, status
from app.models import Photo
from app.crud import create_photo, get_photo_by_id, update_photo, delete_photo
from app.dependencies import get_db, get_current_user

photo_router = APIRouter()

@photo_router.post("/photos", status_code=status.HTTP_201_CREATED)
async def create_photo(photo: Photo, current_user: str = Depends(get_current_user), db: Database = Depends(get_db)):
    # Check if the user is authorized to create a photo (e.g., admin)
    # Add authorization logic here based on your requirements
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to create a photo"
        )
    photo_id = await create_photo(db, photo)
    return {"photo_id": photo_id}

@photo_router.get("/photos/{photo_id}", response_model=Photo)
async def get_photo(photo_id: int, db: Database = Depends(get_db)):
    photo = await get_photo_by_id(db, photo_id)
    if not photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found"
        )
    return photo

@photo_router.put("/photos/{photo_id}", response_model=Photo)
async def update_photo(photo_id: int, photo: Photo, current_user: str = Depends(get_current_user), db: Database = Depends(get_db)):
    # Check if the user is authorized to update the photo
    # Add authorization logic here based on your requirements
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to update this photo"
        )
    updated_photo = await update_photo(db, photo_id, photo)
    if not updated_photo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found"
        )
    return updated_photo

@photo_router.delete("/photos/{photo_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_photo(photo_id: int, current_user: str = Depends(get_current_user), db: Database = Depends(get_db)):
    # Check if the user is authorized to delete the photo
    # Add authorization logic here based on your requirements
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to delete this photo"
        )
    deleted = await delete_photo(db, photo_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found"
        )
    return
