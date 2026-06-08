from fastapi import Depends
from ...core.security.jwt_helpers import get_current_user
from ...database import get_db
from ...models.user import User

def user_index(user = Depends(get_current_user), db = Depends(get_db)):
    """Delivers an index of all users with their title and slugs"""

    index = (
        db.query(User.username, User.id)
            .all()
    )

    return [{ "username": row.username, "id": row.id} for (row) in index]