from fastapi import APIRouter
from .register import register
from .login import login
from .me import me
from backend.schematics.user import UserOutData

router = APIRouter(tags=["authentification"])

router.add_api_route(
    "/register",
    register, 
    methods=["POST"], 
    response_model=UserOutData
)
router.add_api_route(
    "/login",
    login,
    methods=["POST"]
)
router.add_api_route(
    "/me",
    me,
    methods=["GET"],
    response_model=UserOutData
)