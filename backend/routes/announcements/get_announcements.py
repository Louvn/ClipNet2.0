from fastapi import Depends
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.models import Announcement
from sqlalchemy.sql import func

def get_announcements(user = Depends(get_current_user), db = Depends(get_db)):

    announcements = db.query(Announcement).filter(Announcement.expires_at > func.now()).all()

    return announcements