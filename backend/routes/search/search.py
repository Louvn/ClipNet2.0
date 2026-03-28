from fastapi import Depends
from sqlalchemy import or_
from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.schematics.search import SearchQueryData
from backend.models.revision import Revision
from backend.models.user import User
from backend.schematics.content_type import ContentType
from backend.schematics.article import ArticleOutData
from backend.schematics.user import UserOutData

def search(searchData: SearchQueryData, db = Depends(get_db), user = Depends(get_current_user)):
    
    results = []

    # -- Articles --
    if ContentType.article in searchData.filters.content_types:

        # search revisions
        revisions = db.query(Revision).filter(
            or_(
                Revision.title.ilike(f"%{searchData.query}%"),
                Revision.content.ilike(f"%{searchData.query}%")
            )
        ).all()

        # ignore revisions that are not current revision of an article
        revisions = [revision for revision in revisions if revision.article.current_revision == revision]

        # get the articles from the revisions
        articles = [revision.article for revision in revisions]


        articles = [ArticleOutData.model_validate(article, from_attributes=True) for article in articles]

        results.extend(articles)


    # -- Users -- 
    if ContentType.user in searchData.filters.content_types:

        # search users
        users = db.query(User).filter(
            User.username.ilike(f"%{searchData.query}%")
        ).all()

        
        users = [UserOutData.model_validate(user, from_attributes=True) for user in users]

        results.extend(users)

    return results