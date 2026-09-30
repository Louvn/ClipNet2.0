from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from fastapi import Depends, HTTPException
from backend.models import Revision

def get_article_revisions(article_id: int, db = Depends(get_db), user = Depends(get_current_user)):

    revisions = db.query(Revision).filter(Revision.article_id == article_id).all()

    if len(revisions) < 1 or revisions[0].article.is_deleted:
        raise HTTPException(404, "ARTICLE_NOT_FOUND")

    return revisions