from fastapi import Depends
from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.schematics.search import SearchQueryData
from ...core.search import search as do_search

def search(searchData: SearchQueryData, db = Depends(get_db), user = Depends(get_current_user)):
    
    results = do_search(
        searchData.query,
        searchData.filters,
        searchData.sort_by,
        db
    )

    return results