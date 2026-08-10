from fastapi import Depends
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.models import Announcement
from backend.schematics.announcement import AnnouncementCreateData

def create_announcement(data: AnnouncementCreateData, user = Depends(get_current_user), db = Depends(get_db)): # TODO: check if admin

    announcement = Announcement(
        title = data.title,
        message = data.message,
        link = data.link,
        expires_at = data.expires_at
    )

    db.add(announcement)

    db.commit()
    db.refresh(announcement)

    return announcement