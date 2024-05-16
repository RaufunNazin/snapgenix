from fastapi import Depends, status, APIRouter, HTTPException
from ..database import get_db
from sqlalchemy.orm import Session
from .. import models, oauth2
from ..schemas import Booking
from app.oauth2 import check_authorization

router = APIRouter()

@router.post("/bookings", tags=['booking'])
def create_booking(booking: Booking, db: Session = Depends(get_db)):
    new_booking = models.Booking(**booking.dict())
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

@router.get("/bookings", tags=['booking'])
def get_bookings(db: Session = Depends(get_db)):
    bookings = db.query(models.Booking).all()
    return bookings

@router.get("/search_booking", tags=['booking'])
def search_booking(id: int = None, user_id: int = None, db: Session = Depends(get_db)):
    if id:
        booking = db.query(models.Booking).filter(models.Booking.id == id).first()
        return booking
    elif user_id:
        booking = db.query(models.Booking).filter(models.Booking.user_id == user_id).all()
        return booking
    else:
        return {"message": "Please provide either id or user_id"}
    
    
#update status of a booking and make it 1 and check if user is admin with patch api with booking id
@router.patch("/bookings/{id}", tags=['booking'])
def update_booking_status(id: int, db: Session = Depends(get_db), user = Depends(oauth2.get_current_user)):
    check_authorization(user)
    booking_db = db.query(models.Booking).filter(models.Booking.id == id).first()
    if booking_db is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    db.query(models.Booking).filter(models.Booking.id == id).update({"status": 1})
    db.commit()
    return {"message": "Booking approved successfully"}


@router.delete("/bookings", tags=['booking'])
def delete_booking(id: int, db: Session = Depends(get_db)):
    booking = db.query(models.Booking).filter(models.Booking.id == id).first()
    if booking is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
    db.delete(booking)
    db.commit()
    return {"message": "Booking deleted successfully"}