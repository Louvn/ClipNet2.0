from pydantic import BaseModel, constr, Field
from typing import Optional, List
from .content_type import ContentType
from .revision import RevisionOutData
from .user import UserOutData
from .permissions import EditPermission

class ArticleCreateData(BaseModel):
    title: constr(min_length=1, max_length=50)
    content: constr(min_length=1)

class ArticleOutData(BaseModel):
    type: ContentType = ContentType.article
    id: int
    slug: str
    op: UserOutData
    current_revision: RevisionOutData
    first_revision: RevisionOutData
    revision_count: Optional[int] = None

class ArticleGetData(BaseModel):
    id: Optional[int] = Field(None)
    slug: Optional[str] = Field(None)

class ArticlePermissionsData(BaseModel):
    id: int
    edit_permission: EditPermission
    contributors: List[int]