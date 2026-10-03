from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from fastapi import Depends, HTTPException
from backend.models import Revision, Article
from backend.schematics.article import ArticleGetData

def get_article_revisions(article_data = Depends(ArticleGetData), db = Depends(get_db), user = Depends(get_current_user)):

    if article_data.id is not None:
        revisions = db.query(Revision).filter(Revision.article_id == article_data.id)
    elif article_data.slug is not None:
        revisions = db.query(Revision).join(Revision.article).filter(Article.slug == article_data.slug)

    if not revisions:
        return
    revisions = revisions.order_by(Revision.created_at.desc()).all()

    if len(revisions) < 1 or revisions[0].article.is_deleted:
        raise HTTPException(404, "ARTICLE_NOT_FOUND")

    return revisions