# backend/app/dependencies.py
from fastapi import HTTPException, status
from app.security import SECRET_KEY, ALGORITHM
from jose import jwt
from typing import Optional
from fastapi.security import OAuth2PasswordBearer
from databases import Database

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_db():
    db = Database("mysql://username:password@localhost/db_name")
    try:
        await db.connect()
        yield db
    finally:
        await db.disconnect()

async def get_current_user(token: str = Depends(oauth2_scheme)) -> Optional[str]:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return email
    except jwt.ExpiredSignatureError:
        raise credentials_exception
    except jwt.JWTError:
        raise credentials_exception
