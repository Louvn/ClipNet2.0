from backend.database import Base
from sqlalchemy import Column, Integer, ForeignKey, DateTime, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

class Image(Base):
    __tablename__ = "images"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"))
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    url = Column(String, nullable=False)
    storage_key = Column(String, nullable=False)
    file_hash = Column(String, nullable=False)
    description = Column(String(255), nullable=True)

    user = relationship("User", foreign_keys=[user_id])