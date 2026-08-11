from backend.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Report(Base):
    __tablename__ = "reports"
    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    reason = Column(String(255), nullable=False)
    pending = Column(Boolean, server_default="true", nullable=False)

    article = relationship("Article", foreign_keys=[article_id])
    user = relationship("User", foreign_keys=[user_id])