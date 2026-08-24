from pydantic import BaseModel, constr
from .user import UserOutData
from datetime import datetime

class ImageOutData(BaseModel):
    id: int
    user: UserOutData
    created_at: datetime
    url: str
    description: constr(max_length=255)