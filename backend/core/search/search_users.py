from ...models import User
from sqlalchemy import or_

def search_users(query, filters, db):

    # search users
    users = db.query(User).filter(
        or_(
            User.username.ilike(f"%{query}%"),
            User.bio.ilike(f"%{query}%")
        )
    ).all()

    return users