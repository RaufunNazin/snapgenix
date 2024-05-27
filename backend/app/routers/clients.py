from fastapi import Depends, APIRouter, HTTPException, status, File, UploadFile, Path, Form, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from ..database import get_db, SessionLocal
from .. import models, oauth2
from ..models import Photo, Client
import shutil
import os
from pydantic import BaseModel
from app.oauth2 import check_authorization

router = APIRouter()

@router.post("/clients", status_code=201, tags=['clients'])
async def upload_client(request: Request, photo: UploadFile = File(...), name: str = Form(...), user = Depends(oauth2.get_current_user)):
    check_authorization(user)
    
    # Get the server's base URL
    base_url = request.base_url

    # Get the directory path of the current module
    current_directory = os.path.dirname(os.path.realpath(__file__))

    # Create a new folder named 'photos' in the current directory if it doesn't exist
    folder_path = os.path.join(current_directory, "..", "..", "..", "frontend", "public")
    os.makedirs(folder_path, exist_ok=True)

    # Save the uploaded photo to the specified folder
    file_location = os.path.join(folder_path, f"client-{name}.png")
    with open(file_location, "wb") as file_object:
        file_object.write(photo.file.read())

    # Construct the URL for the uploaded photo
    photo_url = f"/client-{name}.png"

    # Save photo information to the database
    db = SessionLocal()
    db_photo = Client(photo=photo_url, name=name)
    db.add(db_photo)
    db.commit()
    db.refresh(db_photo)
    db.close()

    return {"photo": photo_url, "title": name}


@router.get("/clients", tags=['clients'])
def get_clients(db: Session = Depends(get_db), user = Depends(oauth2.get_current_user)):
    clients = db.query(models.Client).all()
    return clients

# update api
@router.put("/clients/{id}", tags=['clients'])
def update_client(id: int, name: str, db: Session = Depends(get_db), user = Depends(oauth2.get_current_user)):
    check_authorization(user)
    client = db.query(models.Client).filter(models.Client.id == id).first()
    if client is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found")
    db.query(models.Client).filter(models.Client.id == id).update({"name": name})
    db.commit()
    return {"message": "Client updated successfully"}

@router.delete("/clients/{id}", status_code = 204, tags=['clients'])
def delete_client(id: int, db: Session = Depends(get_db), user = Depends(oauth2.get_current_user)):
    check_authorization(user)
    client = db.query(models.Client).filter(models.Client.id == id).first()
    if client is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Client not found")
    db.delete(client)
    db.commit()
    return {"message": "Client deleted successfully"}