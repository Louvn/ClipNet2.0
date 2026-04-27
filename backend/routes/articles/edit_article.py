from fastapi import Depends, HTTPException
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.schematics.revision import RevisionCreateData
from backend.models.article import Article
from backend.models.revision import Revision
from sqlalchemy import and_

def edit_article(revision_data: RevisionCreateData, user = Depends(get_current_user), db = Depends(get_db)):
    "Editing an Article will create a new Revision and set it to the current_revision"
    
    # Find the article to edit
    existing_article_with_id = db.query(Article).filter(Article.id == revision_data.article_id).first()
    if not existing_article_with_id:
        raise HTTPException(status_code=400, detail="There was no article with the provided ID")
    
    # Changes made?
    if (
        existing_article_with_id.current_revision.title == revision_data.title 
        and existing_article_with_id.current_revision.content == revision_data.content
        ):
        raise HTTPException(status_code=400, detail="There were no changes made")

    
    # Avoid name conflicts in subwikis
    existing_article_with_title = (
        db.query(Article)
        .join(Revision, Article.current_revision)
        .filter(
            and_(
                Revision.title == revision_data.title,
                Article.id != revision_data.article_id
            )
        )
        .first()
    )
    if existing_article_with_title:
        raise HTTPException(status_code=400, detail="An Article with this title already exists")
    
    # Create new Revision
    new_revision = Revision(
        title = revision_data.title,
        content = revision_data.content,
        change_summary = revision_data.change_summary,
        article = existing_article_with_id,
        user = user
    )
    db.add(new_revision)

    # Update the current_revision
    existing_article_with_id.current_revision = new_revision

    db.commit()
    db.refresh(new_revision)

    return new_revision