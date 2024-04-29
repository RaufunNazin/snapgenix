# backend/app/booking/booking.py
from fastapi import APIRouter, Depends, HTTPException, status
from app.models import Booking
from app.crud import create_booking, get_booking_by_id, update_booking, delete_booking
from app.dependencies import get_db, get_current_user
from databases import Database

booking_router = APIRouter()

@booking_router.post("/bookings", status_code=status.HTTP_201_CREATED)
async def make_booking(booking: Booking, current_user: str = Depends(get_current_user), db: Database = Depends(get_db)):
    # Check if the user is authorized to make a booking
    # Add authorization logic here based on your requirements
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to make a booking"
        )
    booking_id = await create_booking(db, booking)
    return {"booking_id": booking_id}

@booking_router.get("/bookings/{booking_id}", response_model=Booking)
async def get_booking(booking_id: int, db: Database = Depends(get_db)):
    booking = await get_booking_by_id(db, booking_id)
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    return booking

@booking_router.put("/bookings/{booking_id}", response_model=Booking)
async def update_booking(booking_id: int, booking: Booking, current_user: str = Depends(get_current_user), db: Database = Depends(get_db)):
    # Check if the user is authorized to update the booking
    # Add authorization logic here based on your requirements
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to update this booking"
        )
    updated_booking = await update_booking(db, booking_id, booking)
    if not updated_booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    return updated_booking

@booking_router.delete("/bookings/{booking_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_booking(booking_id: int, current_user: str = Depends(get_current_user), db: Database = Depends(get_db)):
    # Check if the user is authorized to cancel the booking
    # Add authorization logic here based on your requirements
    if not current_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="You are not authorized to cancel this booking"
        )
    deleted = await delete_booking(db, booking_id)
    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Booking not found"
        )
    return
