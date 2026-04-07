from ...database import get_db
from ...models import User
from fastapi import Depends

def search_users(query, filters, db):

    # search users
    users = db.query(User).filter(
        User.username.ilike(f"%{query}%")
    ).all()

    return users