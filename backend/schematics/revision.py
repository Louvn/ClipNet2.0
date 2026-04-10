from pydantic import BaseModel, constr
from datetime import datetime

class RevisionCreateData(BaseModel):
    title: constr(min_length=1, max_length=50)
    content: str
    change_summary: constr(min_length=10, max_length=255)
    article_id: int

class RevisionOutData(BaseModel):
    id: int
    title: str
    content: str
    user_id: int
    change_summary: str
    created_at: datetime