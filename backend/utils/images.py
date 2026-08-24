import cloudinary
import cloudinary.uploader
import os
from fastapi import HTTPException
import hashlib
from backend.models import Image
from PIL import Image as PILImage
from io import BytesIO

# constants
ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif"
]
MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5 MB

# cloudinary configuration
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET")
)



def uploadFile(file):

    res = cloudinary.uploader.upload(file, folder="clipnet/images")

    return res

async def checkFile(file, db):
    """Checks size, format, etc. of the uploaded file"""

    # file existing?
    if not file.filename:
        raise HTTPException(400, "NO_FILE")

    # file ending allowed?
    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(400, "INVALID_FILE_TYPE")


    content = await file.read()

    # file too large?
    if len(content) > MAX_IMAGE_SIZE:
        raise HTTPException(400, "FILE_TOO_LARGE")

    # already uploaded?
    file_hash = hashlib.sha256(content).hexdigest()
    existing_file = db.query(Image).filter(Image.file_hash == file_hash).first()

    if existing_file:
        raise HTTPException(409, "IMAGE_ALREADY_EXISTS")

    # valid image?
    try:
        image = PILImage.open(BytesIO(content))
        image.verify()
    except Exception:
        raise HTTPException(400, "INVALID_IMAGE")



    return content, file_hash