from fastapi import Depends, HTTPException
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.schematics.article import ArticleGetData, ArticleOutData
from backend.models import Article, Contributor, Like

def get_article(provided_infos = Depends(ArticleGetData), user = Depends(get_current_user), db = Depends(get_db)):
    "You can get the data of an Article via slug or id of the Article"
    
    if provided_infos.id is not None:
        article = db.query(Article).filter(Article.id == provided_infos.id, Article.is_deleted.is_(False)).first()
    elif provided_infos.slug is not None:
        article = db.query(Article).filter(Article.slug == provided_infos.slug, Article.is_deleted.is_(False)).first()
    
    if not article:
        raise HTTPException(status_code=404, detail="ARTICLE_NOT_FOUND")
    

    article_data = ArticleOutData.model_validate(article, from_attributes=True)
    article_data.revision_count = len(article.revisions)

    # get contributors
    contributors = db.query(Contributor).filter(Contributor.article_id == article.id).all()
    article_data.contributors = [c.user_id for c in contributors]

    # get likes 
    liked_by = db.query(Like).filter(Like.article_id == article.id).all()
    article_data.liked_by = [l.user_id for l in liked_by]

    return article_data