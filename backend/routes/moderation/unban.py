from fastapi import Depends, HTTPException
from backend.core.security.jwt_helpers import get_current_admin
from backend.database import get_db
from backend.models import User

def unban(user_id: int, user = Depends(get_current_admin), db = Depends(get_db)):

    existing_user = db.query(User).filter(User.id == user_id).first()

    if not existing_user:
        raise HTTPException(404, "USER_NOT_FOUND")

    if not existing_user.is_banned:
        raise HTTPException(status_code=400, detail="USER_ALREADY_UNBANNED")

    existing_user.is_banned = False

    db.commit()
    db.refresh(existing_user)

    return existing_user