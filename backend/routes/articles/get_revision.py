from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from fastapi import Depends, HTTPException
from backend.models import Revision

def get_revision(revision_id: int, db = Depends(get_db), user = Depends(get_current_user)):

    revision = db.query(Revision).filter(Revision.id == revision_id).first()

    if not revision or revision.article.is_deleted:
        raise HTTPException(404, "REVISION_NOT_FOUND")

    return revision