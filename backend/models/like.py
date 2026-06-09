from backend.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime
from sqlalchemy.sql import func

class Like(Base):
    __tablename__ = "likes"
    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())