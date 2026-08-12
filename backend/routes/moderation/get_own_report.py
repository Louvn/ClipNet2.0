from fastapi import Depends
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.models import Report

def get_own_report(article_id: int, user = Depends(get_current_user), db = Depends(get_db)):
    """Delivers the report made by the current user for the article."""

    return db.query(Report).filter(Report.article_id == article_id, Report.user_id == user.id).first()