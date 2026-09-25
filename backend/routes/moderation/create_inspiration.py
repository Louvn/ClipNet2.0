from fastapi import Depends, HTTPException
from backend.core.security.jwt_helpers import get_current_admin
from backend.database import get_db
from backend.models import Inspiration

def create_inspiration(text: str, user = Depends(get_current_admin), db = Depends(get_db)):

    if db.query(Inspiration).filter(Inspiration.text == text):
        raise HTTPException(409)

    inspiration = Inspiration(
        text = text
    )
    db.add(inspiration)
    db.commit()

    db.refresh(inspiration)
    return inspiration