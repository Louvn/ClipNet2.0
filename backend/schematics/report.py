from pydantic import BaseModel, constr
from .article import ArticleOutData
from .user import UserOutData
from datetime import datetime

class ReportArticleData(BaseModel):
    article_id: int
    reason: constr(max_length=255)

class ReportOutData(BaseModel):
    article: ArticleOutData
    user: UserOutData
    reason: constr(max_length=255)
    created_at: datetime
    pending: bool