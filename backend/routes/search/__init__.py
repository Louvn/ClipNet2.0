from fastapi import APIRouter
from .search import search

router = APIRouter(tags=["search"])

router.add_api_route(
    "/search",
    search, 
    methods=["POST"]
)