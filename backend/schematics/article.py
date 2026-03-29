from pydantic import BaseModel, constr, Field
from typing import Optional
from .content_type import ContentType
from .revision import RevisionOutData
from .user import UserOutData

class ArticleCreateData(BaseModel):
    title: constr(min_length=1, max_length=50)
    content: str

class ArticleOutData(BaseModel):
    type: ContentType = ContentType.article
    id: int
    slug: str
    op: UserOutData
    current_revision: RevisionOutData

class ArticleGetData(BaseModel):
    id: Optional[int] = Field(None)
    slug: Optional[str] = Field(None)