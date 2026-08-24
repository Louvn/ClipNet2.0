from fastapi import Depends, UploadFile, Form
from backend.core.security.jwt_helpers import get_current_user
from backend.database import get_db
from backend.utils.images import checkFile, uploadFile
from backend.models import Image

async def upload_image(
        # multipart/form-data doesn't work normally with pydantic
        file: UploadFile,
        description: str | None = Form(None),

        user = Depends(get_current_user), 
        db = Depends(get_db),
    ):

    # if file isn't valid the utility throws an error
    file_content, file_hash = await checkFile(file, db)

    uploaded = uploadFile(file_content)

    image = Image(
        user_id = user.id,
        description = description,
        url = uploaded["secure_url"],
        storage_key = uploaded["public_id"],
        file_hash = file_hash
    )

    db.add(image)
    db.commit()

    db.refresh(image)
    return image