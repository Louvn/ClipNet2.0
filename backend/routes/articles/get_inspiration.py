from fastapi import Depends
from ...core.security.jwt_helpers import get_current_user
from ...database import get_db
from ...models import Inspiration

def get_inspiration(user = Depends(get_current_user), db = Depends(get_db)):

    insipration = db.query(Inspiration).all()

    return insipration