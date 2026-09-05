from fastapi import Depends
from ...database import get_db
from ...core.security.jwt_helpers import get_current_user
from ...models import User, Article, Image


def general_statistics(db = Depends(get_db), user = Depends(get_current_user)):

    stats = {
        "users": db.query(User).count(),
        "articles": db.query(Article).filter(Article.is_deleted.is_(False)).count(),
        "images": db.query(Image).count()
    }

    return stats