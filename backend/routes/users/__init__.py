from fastapi import APIRouter
from .user_index import user_index
from .get_user import get_user
from .settings.get_settings import get_settings
from .settings.change_settings import change_settings
from backend.schematics.user import SettingsData

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

router.add_api_route(
    "/get-settings",
    get_settings,
    methods=["GET"],
    response_model=SettingsData
)

router.add_api_route(
    "/change-settings",
    change_settings,
    methods=["PUT"],
    response_model=SettingsData
)