from ...models import Revision
from ...database import get_db
from fastapi import Depends
from sqlalchemy import or_

def search_articles(query, filters, db):
        
    # search revisions
    revisions = db.query(Revision).filter(
        or_(
            Revision.title.ilike(f"%{query}%"),
            Revision.content.ilike(f"%{query}%")
        )
    ).all()

    # ignore revisions that are not current revision of an article
    revisions = [revision for revision in revisions if revision.article.current_revision == revision]

    # get the articles from the revisions
    articles = [revision.article for revision in revisions]


    return articles