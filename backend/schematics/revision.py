from pydantic import BaseModel, constr
from datetime import datetime
from .user import UserOutData

class RevisionCreateData(BaseModel):
    title: constr(min_length=1, max_length=50)
    content: constr(min_length=1)
    change_summary: constr(max_length=255)
    article_id: int

class RevisionOutData(BaseModel):
    id: int
    title: str
    content: str
    user: UserOutData
    change_summary: str
    created_at: datetime