from fastapi import Depends, HTTPException
from backend.core.security.jwt_helpers import get_current_admin
from backend.database import get_db
from backend.models import User

def ban(user_id: int, user = Depends(get_current_admin), db = Depends(get_db)):

    existing_user = db.query(User).filter(User.id == user_id).first()

    if not existing_user:
        raise HTTPException(404, "User not found")

    if existing_user.id == user.id:
        raise HTTPException(400, "You cannot ban yourself")

    if existing_user.is_banned:
        raise HTTPException(status_code=400, detail="User is already banned")

    existing_user.is_banned = True

    db.commit()
    db.refresh(existing_user)

    return existing_user