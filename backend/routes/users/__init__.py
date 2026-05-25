from fastapi import APIRouter
from .user_index import user_index
from backend.schematics.article import ArticleOutData
from backend.schematics.revision import RevisionOutData

router = APIRouter(tags=["users"])

router.add_api_route(
    "/user-index",
    user_index,
    methods=["GET"]
)