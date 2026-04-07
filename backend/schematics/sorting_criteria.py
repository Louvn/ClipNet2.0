from enum import Enum

class SortingCriteria(str, Enum):
    relevance = "relevance"
    newest_first = "newest_first"
    oldest_first = "oldest_first"