from fastapi import APIRouter
from .upload_image import upload_image
from backend.schematics.image import ImageOutData

router = APIRouter(tags=["images"])

router.add_api_route(
    "/upload-image",
    upload_image, 
    methods=["POST"],
    response_model=ImageOutData
)