from fastapi import Depends
from ...database import get_db
from ...core.security.jwt_helpers import get_current_user
from ...models.user import User
from ...models.article import Article


def general_statistics(db = Depends(get_db), user = Depends(get_current_user)):

    stats = {
        "users": db.query(User).count(),
        "articles": db.query(Article).count()
    }

    return stats