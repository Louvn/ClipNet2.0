from ..database import Base
from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func

class Inspiration(Base):
    __tablename__ = "inspiration"
    id = Column(Integer, primary_key=True)
    text = Column(Text, nullable=False, unique=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())