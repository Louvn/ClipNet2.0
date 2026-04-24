from fastapi import APIRouter
from .general import general_statistics

router = APIRouter(tags=["statistics"], prefix="/stats")

router.add_api_route(
    "/general",
    general_statistics, 
    methods=["GET"]
)