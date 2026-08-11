from fastapi import Depends
from ...core.security.jwt_helpers import get_current_user
from ...database import get_db
from ...models.article import Article
from ...models.revision import Revision
from ...models.user import User

def wiki_index(user = Depends(get_current_user), db = Depends(get_db)):
    """Delivers an index of all article with their title and slugs"""

    index = (
        db.query(Revision.title, Article.slug, User.username)
            .join(Article.current_revision)
            .join(Article.op)
            .filter(Article.is_deleted.is_(False))
            .all()
    )

    # response is in the typical format also used by /get-article
    return [{ "current_revision": {"title": title}, "slug": slug, "op": {"username": owner}} for title, slug, owner in index]