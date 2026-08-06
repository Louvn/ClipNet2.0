from pydantic import BaseModel, constr
from .content_type import ContentType
from datetime import datetime

class UserCreateData(BaseModel):
    username: str
    password: constr(min_length=8)
    token: str # For Permission-Only Logins

class UserOutData(BaseModel):
    type: ContentType = ContentType.user
    id: int
    username: str
    created_at: datetime
    bio: str | None
    language: str

    total_articles: int = None
    total_articles_contributed_to: int = None

class SettingsData(BaseModel):
    language: str = None 
    bio: constr(max_length=255) | None = None # err