from ..database import Base
from sqlalchemy import Column, ForeignKey, String, Integer, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"))
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    content = Column(String(255))

    user = relationship("User", foreign_keys=[user_id])