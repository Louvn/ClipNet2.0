from fastapi import APIRouter
from .user_index import user_index
from .get_user import get_user
from backend.schematics.user import UserOutData

router = APIRouter(tags=["users"])

router.add_api_route(
    "/user-index",
    user_index,
    methods=["GET"]
)

router.add_api_route(
    "/get-user",
    get_user,
    methods=["GET"]
)