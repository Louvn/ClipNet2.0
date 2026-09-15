from fastapi import Depends
from backend.database import get_db
from backend.core.security.jwt_helpers import get_current_user
from backend.schematics.search import SearchQueryData
from backend.core.analytics.search_query import search_query_handler
from backend.core.search import search as do_search

def search(searchData: SearchQueryData, db = Depends(get_db), user = Depends(get_current_user)):
    
    results = do_search(
        searchData.query,
        searchData.filters,
        searchData.sort_by,
        searchData.offset,
        searchData.length,
        db
    )

    search_query_handler(db, user, searchData.query)

    return results