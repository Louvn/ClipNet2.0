from pydantic import BaseModel, conint, Field
from typing import List
from .content_type import ContentType
from .sorting_criteria import SortingCriteria

class SearchFilters(BaseModel):

    # ContentType - standard are all
    content_type: List[ContentType] = Field(default_factory=lambda: [type.value for type in ContentType])

    op_id: int = None
    contributor_id: int = None

class SearchQueryData(BaseModel):
    
    query: str = Field(default="") # can be empty
    filters: SearchFilters = Field(default_factory=SearchFilters)
    sort_by: SortingCriteria = SortingCriteria.relevance
    length: conint(ge=1, le=50) = Field(default=21)
    offset: int = Field(default=20)