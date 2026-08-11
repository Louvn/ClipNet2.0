from ...models import Revision, Article
from sqlalchemy import or_
from sqlalchemy.orm import selectinload, aliased

ContributorRevision = aliased(Revision)

def search_articles(query, filters, db):
        
    # search db_query
    db_query = (
        db.query(Revision)
            .options(
                # eager loading enhances performance
                selectinload(Revision.article).selectinload(Article.current_revision),
                selectinload(Revision.article).selectinload(Article.first_revision),
                selectinload(Revision.article).selectinload(Article.op),
                selectinload(Revision.user)
            )
            .join(Revision.article)
    )

    # -- Apply all filters --
    if (filters.contributor_id):
        db_query = (
            db_query
                .join(
                    ContributorRevision, # use of alias is important to ignore the check Revision.id == Article.current_revision_id for these db_query
                    ContributorRevision.article_id == Article.id
                )
                .filter(
                    ContributorRevision.user_id == filters.contributor_id,
                    Article.op_id != filters.contributor_id
                )
        )

    elif (filters.op_id):
        db_query = db_query.filter(Article.op_id == filters.op_id)



    # search db_query
    revisions = (
        db_query
            .filter(Revision.id == Article.current_revision_id, Article.is_deleted.is_(False))
            .filter(
                or_(
                    Revision.title.ilike(f"%{query}%"),
                    Revision.content.ilike(f"%{query}%")
                )
            )
            .distinct()
            .all()
    )

    # get the articles from the db_query
    articles = [revision.article for revision in revisions]

    return articles