from fastapi import APIRouter
from .get_announcements import get_announcements
from .create_announcement import create_announcement
from backend.schematics.announcement import AnnouncementOutData

router = APIRouter(tags=["announcements"])

router.add_api_route(
    "/get-announcements",
    get_announcements,
    methods=["GET"],
    response_model=list[AnnouncementOutData]
)

router.add_api_route(
    "/create-announcement",
    create_announcement,
    methods=["POST"],
    response_model=AnnouncementOutData
)