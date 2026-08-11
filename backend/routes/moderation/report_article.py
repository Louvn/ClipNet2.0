from fastapi import Depends, HTTPException
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.models import Report, Article
from backend.schematics.report import ReportArticleData

def report_article(data: ReportArticleData, user = Depends(get_current_user), db = Depends(get_db)):

    existing_article = db.query(Article).filter(Article.id == data.article_id, Article.is_deleted.is_(False)).first()
    
    if not existing_article:
        raise HTTPException(404, "Article not found.")

    existing_report = db.query(Report).filter(Report.article_id == data.article_id, Report.user_id == user.id).first()

    if existing_report:
        raise HTTPException(400, "User already reported this article.")


    report = Report(
        article_id = data.article_id,
        reason = data.reason,
        user_id = user.id
    )

    db.add(report)
    db.commit()
    db.refresh(report)

    return report