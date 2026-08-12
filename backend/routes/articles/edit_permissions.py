from fastapi import Depends, HTTPException
from ...database import get_db
from ...core.security.jwt_helpers import get_current_user
from ...models import Article, Contributor, User
from ...schematics.article import ArticlePermissionsData

def edit_permissions(data: ArticlePermissionsData, db = Depends(get_db), user = Depends(get_current_user)):

    existing_article = db.query(Article).filter(Article.id == data.id, Article.is_deleted.is_(False)).first()

    if not existing_article:
        raise HTTPException(status_code=404, detail="ARTICLE_NOT_FOUND")
    if not user.id == existing_article.op_id:
        raise HTTPException(status_code=403, detail="NOT_ALLOWED")
    
    # set edit permission
    existing_article.edit_permission = data.edit_permission

    # delete all contributors
    db.query(Contributor).filter(Contributor.article_id == existing_article.id).delete()

    # get existing users
    existing_users = {
        user.id
        for user in db.query(User).filter(User.id.in_(data.contributors)).all()
    }

    # set contributors
    for c in set(data.contributors):
        if not c in existing_users: continue

        contributor = Contributor(
            article_id=existing_article.id,
            user_id=c
        )

        db.add(contributor)

    db.commit()

    return { "message": "Permissions updated"}