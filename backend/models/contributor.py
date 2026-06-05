from ..database import Base
from sqlalchemy import Column, Integer, ForeignKey

class Contributor(Base):
    __tablename__ = "contributors"
    article_id = Column(Integer, ForeignKey("articles.id", ondelete="CASCADE"), primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True)