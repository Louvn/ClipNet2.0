from pydantic import BaseModel, constr
from datetime import datetime

class AnnouncementCreateData(BaseModel):
    title: constr(min_length=3, max_length=50)
    message: constr(max_length=500)
    link: constr(max_length=255) | None = None
    expires_at: datetime

class AnnouncementOutData(BaseModel):
    id: int
    title: constr(min_length=3, max_length=50)
    message: constr(max_length=500)
    link: constr(max_length=255) | None = None
    created_at: datetime
    expires_at: datetime