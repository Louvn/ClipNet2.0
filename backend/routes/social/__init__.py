from fastapi import APIRouter
from .like import like, remove_like
from .create_comment import create_comment
from backend.schematics.comment import CommentOutData

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

router.add_api_route(
    "/create-comment",
    create_comment,
    methods=["POST"],
    response_model=CommentOutData
)