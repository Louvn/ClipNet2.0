from fastapi import Depends, HTTPException
from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.models import Like, Article

def like(article_id: int, db = Depends(get_db), user = Depends(get_current_user)):
    
    existing_article = db.query(Article).filter(Article.id == article_id, Article.is_deleted.is_(False)).first()
    if not existing_article: raise HTTPException(status_code=404, detail="ARTICLE_NOT_FOUND")

    existing_like = db.query(Like).filter(Like.user_id == user.id, Like.article_id == article_id).first()
    if existing_like: raise HTTPException(status_code=400, detail="ALREADY_LIKED_ARTICLE")

    like = Like(
        user_id=user.id,
        article_id=article_id
    )

    db.add(like)
    db.commit()

    return { "message": "liked" }

def remove_like(article_id: int, db = Depends(get_db), user = Depends(get_current_user)):
    
    existing_article = db.query(Article).filter(Article.id == article_id, Article.is_deleted.is_(False)).first()
    if not existing_article: raise HTTPException(status_code=404, detail="ARTICLE_NOT_FOUND")

    existing_like = db.query(Like).filter(Like.user_id == user.id, Like.article_id == article_id).first()
    if not existing_like: raise HTTPException(status_code=404, detail="ARTICLE_NOT_LIKED")

    db.delete(existing_like)
    db.commit()

    return { "message": "removed like" }