from backend.schematics.permissions import EditPermission
from backend.models.contributor import Contributor
from sqlalchemy import and_

def is_user_allowed_to_edit(db, user, article):

    if article.op_id == user.id:
        return True
    
    if article.edit_permission == EditPermission.everyone:
        return True
    
    if article.edit_permission == EditPermission.contributors:
        if db.query(Contributor).filter(
            and_(
                Contributor.user_id == user.id,
                Contributor.article_id == article.id
            )
        ).first():
            return True
        
    return False