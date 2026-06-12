from pydantic import BaseModel, constr
from .user import UserOutData
from datetime import datetime

class CommentCreateData(BaseModel):
    article_id: int
    content: constr(min_length=1, max_length=255)

class CommentOutData(BaseModel):
    article_id: int
    user: UserOutData
    content: str
    created_at: datetime