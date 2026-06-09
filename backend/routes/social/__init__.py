from fastapi import APIRouter
from .like import like, remove_like

router = APIRouter(tags=["social"])

router.add_api_route(
    "/like/{article_id}",
    like, 
    methods=["POST"]
)

router.add_api_route(
    "/like/{article_id}",
    remove_like, 
    methods=["DELETE"]
)