from enum import Enum

class EventType(str, Enum):
    session_start = "session_start"
    article_view = "article_view"
    search_query = "search_query"