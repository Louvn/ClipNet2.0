from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from fastapi import Depends, HTTPException
from backend.models import Revision

def restore_revision(revision_id: int, db = Depends(get_db), user = Depends(get_current_user)):

    old_revision = db.query(Revision).filter(Revision.id == revision_id).first()

    if not old_revision or old_revision.article.is_deleted:
        raise HTTPException(404, "REVISION_NOT_FOUND")

    new_revision = Revision(
        title = old_revision.title,
        content = old_revision.content,
        change_summary = f"restored revision #{old_revision.id}: {old_revision.change_summary or 'no summary'}",
        article = old_revision.article,
        user = user
    )
    db.add(new_revision)
    db.flush()

    old_revision.article.current_revision = new_revision

    db.commit()
    db.refresh(new_revision)

    return new_revision