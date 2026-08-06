from fastapi import Depends
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.schematics.user import SettingsData

def change_settings(data: SettingsData, user = Depends(get_current_user), db = Depends(get_db)):

    if data.language is not None:
        user.language = data.language

    if data.bio is not None:
        user.bio = data.bio

    db.commit()
    db.refresh(user)

    return user