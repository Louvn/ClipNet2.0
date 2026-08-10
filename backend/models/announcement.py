from ..database import Base
from sqlalchemy import Column, Integer, DateTime, String, Text
from sqlalchemy.sql import func

class Announcement(Base):
    __tablename__ = "announcements"
    id = Column(Integer, primary_key=True)
    title = Column(String(50), nullable=False)
    message = Column(Text, nullable=False)
    link = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    expires_at = Column(DateTime(timezone=True), nullable=False)