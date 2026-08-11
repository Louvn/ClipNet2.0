from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.schematics.comment import CommentCreateData
from backend.models import Comment, Article
from fastapi import Depends, HTTPException

def create_comment(data: CommentCreateData, db = Depends(get_db), user = Depends(get_current_user)):

    existing_article = db.query(Article).filter(Article.id == data.article_id, Article.is_deleted.is_(False)).first()
    if not existing_article: raise HTTPException(status_code=404, detail="Article not found")

    comment = Comment(
        article_id = data.article_id,
        user = user,
        content = data.content
    )

    db.add(comment)
    db.commit()

    db.refresh(comment)

    return comment