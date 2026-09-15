from backend.database import Base
from backend.schematics.event_type import EventType
from sqlalchemy import Column, Integer, ForeignKey, DateTime, Enum, String, UniqueConstraint
from sqlalchemy.sql import func

class Analytics(Base):
    __tablename__ = "analytics"
    id = Column(Integer, primary_key=True)
    session_id = Column(Integer, ForeignKey("analytics.id", ondelete="CASCADE"), index=True, nullable=True)
    event_type = Column(Enum(EventType), nullable=False)

    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), nullable=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), index=True)
    text = Column(String, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    __table_args__ = (
        UniqueConstraint(
            "session_id",
            "event_type",
            "article_id",
            name="uq_analytics_session_event_article"
        ),
        UniqueConstraint(
            "session_id",
            "event_type",
            "text",
            name="uq_analytics_session_event_text"
        ),
    )