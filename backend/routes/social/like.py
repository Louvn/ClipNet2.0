from fastapi import Depends, HTTPException
from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.models import Like, Article

def like(article_id: int, db = Depends(get_db), user = Depends(get_current_user)):
    
    existing_article = db.query(Article).filter(Article.id == article_id).first()
    if not existing_article: raise HTTPException(status_code=404, detail="article not found")

    existing_like = db.query(Like).filter(Like.user_id == user.id, Like.article_id == article_id).first()
    if existing_like: raise HTTPException(status_code=400, detail="already liked this article")

    like = Like(
        user_id=user.id,
        article_id=article_id
    )

    db.add(like)
    db.commit()

    return { "message": "liked" }

def remove_like(article_id: int, db = Depends(get_db), user = Depends(get_current_user)):
    
    existing_article = db.query(Article).filter(Article.id == article_id).first()
    if not existing_article: raise HTTPException(status_code=404, detail="article not found")

    existing_like = db.query(Like).filter(Like.user_id == user.id, Like.article_id == article_id).first()
    if not existing_like: raise HTTPException(status_code=404, detail="no like for this article found")

    db.delete(existing_like)
    db.commit()

    return { "message": "removed like" }