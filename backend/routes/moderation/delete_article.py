from fastapi import Depends, HTTPException
from backend.core.security.jwt_helpers import get_current_admin
from backend.database import get_db
from backend.models import Report, Article

def delete_article(article_id: int, user = Depends(get_current_admin), db = Depends(get_db)):

    existing_article = db.query(Article).filter(Article.id == article_id, Article.is_deleted.is_(False)).first()

    if not existing_article:
        raise HTTPException(404, "ARTICLE_NOT_FOUND")

    existing_article.is_deleted = True

    # all reports for this article pending = false
    db.query(Report).filter(Report.article_id == article_id).update({Report.pending: False})

    db.commit()

    return "Success"