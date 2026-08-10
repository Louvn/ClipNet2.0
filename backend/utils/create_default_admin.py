import os
from backend.models import User
from .hash import hash

def create_default_admin(db):

    username = os.getenv("ADMIN_USERNAME")
    password = os.getenv("ADMIN_PASSWORD")

    if not username or not password:
        raise RuntimeError("ADMIN_USERNAME and ADMIN_PASSWORD must be set")

    existing_admin = db.query(User).filter(User.is_admin.is_(True)).first() # only create if there isn't an admin account

    if existing_admin:
        return

    admin = User(
        username = username,
        password = hash(password),
        is_admin = True
    )

    db.add(admin)
    db.commit()