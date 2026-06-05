from fastapi import APIRouter
from .create_article import create_article
from .edit_article import edit_article
from .get_article import get_article
from .wiki_index import wiki_index
from .edit_permissions import edit_permissions
from backend.schematics.article import ArticleOutData
from backend.schematics.revision import RevisionOutData

router = APIRouter(tags=["articles"])

router.add_api_route(
    "/create-article",
    create_article,
    methods=["POST"],
    response_model=ArticleOutData
)

router.add_api_route(
    "/edit-article",
    edit_article,
    methods=["PUT"],
    response_model=RevisionOutData
)

router.add_api_route(
    "/get-article",
    get_article,
    methods=["GET"]
)

router.add_api_route(
    "/wiki-index",
    wiki_index,
    methods=["GET"]
)

router.add_api_route(
    "/edit-permissions",
    edit_permissions,
    methods=["PUT"]
)