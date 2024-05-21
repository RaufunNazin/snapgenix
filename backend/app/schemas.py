from pydantic import BaseModel, EmailStr
from typing import Optional


class User(BaseModel) :
    username : str
    email : EmailStr
    password : str
    role : int
    
class Client(BaseModel) :
    photo : str
    name : str
    
class Photo(BaseModel) :
    photo : str
    title : str
    description : str
    category : str
    
class Booking(BaseModel) :
    user_id : int
    name: str
    date : str
    service_type : str
    status : int
    description: Optional[str] = None
     
class ResponseUser(BaseModel) :
    id : int
    username : str
    email : EmailStr
    role : int 

    class Config :
        from_attributes = True
        
class UserLogin(BaseModel) :
    username : EmailStr
    password : str

class Token(BaseModel) :
    access_token : str
    token_type : str

class TokenData(BaseModel) :
    id : int 
    email : str

class TokenResponse(BaseModel) :
    access_token : str
    token_type : str
    user : ResponseUser
    
    class Config :
        from_attributes = True