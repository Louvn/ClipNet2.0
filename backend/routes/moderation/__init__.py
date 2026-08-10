from fastapi import APIRouter
from .ban import ban
from .unban import unban
from backend.schematics.user import UserOutData

router = APIRouter(tags=["moderation"])

router.add_api_route(
    "/ban",
    ban,
    methods=["PUT"],
    response_model=UserOutData
)

router.add_api_route(
    "/unban",
    unban,
    methods=["PUT"],
    response_model=UserOutData
)