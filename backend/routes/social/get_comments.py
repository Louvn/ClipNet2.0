from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.schematics.comment import CommentOutData
from backend.models import Comment
from fastapi import Depends

def get_comments(article_id, db = Depends(get_db), user = Depends(get_current_user)):

    comments = db.query(Comment).filter(Comment.article_id == article_id).all()

    return [CommentOutData.model_validate(c, from_attributes=True) for c in comments]