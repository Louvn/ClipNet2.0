from fastapi import Depends, HTTPException
from sqlalchemy.orm import aliased
from sqlalchemy import and_
from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.core.slugs.generate_slug import generate_unique_slug
from backend.schematics.article import ArticleCreateData, ArticleOutData
from backend.schematics.revision import RevisionOutData
from backend.models.article import Article
from backend.models.revision import Revision

def create_article(article_data: ArticleCreateData, db = Depends(get_db), user = Depends(get_current_user)):
    "Creating an Article will create the Article itself and the first Revision."

    rev = aliased(Revision)
    existing_article_with_title = (
        db.query(Article)
        .join(rev, Article.current_revision)
        .filter(
            rev.title == article_data.title
        )
        .first()
    )
    if existing_article_with_title:
        raise HTTPException(status_code=400, detail="Article does already exists")
    
    # Create first revision
    new_revision = Revision(
        title = article_data.title,
        content = article_data.content,
        change_summary = "created this article",
        user = user
    )

    # Create Article
    new_article = Article(
        current_revision = new_revision,
        first_revision = new_revision,
        revisions = [new_revision],
        slug = "",
        op = user
    )

    db.add_all([new_revision, new_article])
    db.flush()

    # Generate a slug
    new_article.slug = generate_unique_slug(
        new_revision.title, 
        Article, 
        new_article.id
    )

    new_revision.article = new_article

    db.commit()
    db.refresh(new_article)
    db.refresh(new_revision)
    
    return new_article