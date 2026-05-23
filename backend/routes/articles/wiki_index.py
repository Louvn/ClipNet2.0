from fastapi import Depends
from ...core.security.jwt_helpers import get_current_user
from ...database import get_db
from ...models.article import Article
from ...models.revision import Revision

def wiki_index(user = Depends(get_current_user), db = Depends(get_db)):
    """Delivers an index of all article with their title and slugs"""

    index = (
        db.query(Revision.title, Article.slug)
            .join(Article.current_revision)
            .all()
    )

    return [{ "title": title, "slug": slug} for title, slug in index]