from pydantic import BaseModel, constr
from .content_type import ContentType

class UserCreateData(BaseModel):
    username: str
    password: constr(min_length=8)
    token: str # For Permission-Only Logins

class UserOutData(BaseModel):
    type: ContentType = ContentType.user
    id: int
    username: str

    class Config:
        from_attributes = True