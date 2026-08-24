from fastapi import Depends
from ...core.security.jwt_helpers import get_current_user
from ...database import get_db
from ...models import Image

def image_index(user = Depends(get_current_user), db = Depends(get_db)):
    """Delivers an index of all images with their id, url and description"""

    index = (
        db.query(Image.id, Image.url, Image.description)
            .all()
    )

    return [{ "id": row.id, "url": row.url, "description": row.description } for (row) in index]