from fastapi import Depends
from ...core.security.jwt_helpers import get_current_user
from ...database import get_db
from ...models import User, Article, Revision
from ...schematics.user import UserOutData
from sqlalchemy import and_, distinct

def get_user(user_id, user = Depends(get_current_user), db = Depends(get_db)):

    user = db.query(User).filter(User.id == user_id).first()

    res = UserOutData.model_validate(user, from_attributes=True)

    # add aditionals
    res.total_articles = db.query(Article).filter(Article.op_id == user_id).count()
    res.total_articles_contributed_to = (
        db.query(distinct(Revision.article_id)) # distinct = every article_id only once
            .join(Article, Revision.article)
            .filter(
                and_(
                    Article.op_id != user_id,
                    Revision.user_id == user_id
                )
            )
            .count()
        )

    return res