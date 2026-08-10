from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from backend.database import get_db
from backend.models.user import User
import os, jwt

SECRET = os.getenv("JWT_SECRET")
ALGORITHM = os.getenv("JWT_ALGORITHM")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")

def get_current_user(token: str = Depends(oauth2_scheme), db = Depends(get_db)):
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username = payload.get("sub")
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Expired token")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    if username is None:
        raise HTTPException(status_code=401, detail="Token payload invalid")
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(status_code=401, detail="User does not exist")

    if user.is_banned:
        raise HTTPException(status_code=403, detail={"code": "USER_BANNED"})
    
    return user


def get_current_admin(user = Depends(get_current_user)):

    if not user.is_admin:
        raise HTTPException(status_code=403, detail="User is not an admin")

    return user