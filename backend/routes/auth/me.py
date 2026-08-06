from fastapi import Depends
from backend.core.security.jwt_helpers import get_current_user

def me(user = Depends(get_current_user)):

    return user