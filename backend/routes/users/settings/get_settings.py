from fastapi import Depends
from backend.core.security.jwt_helpers import get_current_user

def get_settings(user = Depends(get_current_user)):

    return user # filtering (only settings related) happens through response_model in backend.routes.users.__init__.py