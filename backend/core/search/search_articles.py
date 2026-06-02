from ...models import Revision, Article
from ...database import get_db
from fastapi import Depends
from sqlalchemy import or_
from sqlalchemy.orm import selectinload

def search_articles(query, filters, db):
        
    # search revisions
    revisions = (
        db.query(Revision)
            .options(
                selectinload(Revision.article).selectinload(Article.current_revision),
                selectinload(Revision.article).selectinload(Article.first_revision),
                selectinload(Revision.article).selectinload(Article.op),
                selectinload(Revision.user)
            )
            .join(Revision.article)
            .filter(Revision.id == Article.current_revision_id)
            .filter(
                or_(
                    Revision.title.ilike(f"%{query}%"),
                    Revision.content.ilike(f"%{query}%")
                )
            ).all()
    )

    # get the articles from the revisions
    articles = [revision.article for revision in revisions]

    return articles