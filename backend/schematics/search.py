from pydantic import BaseModel, constr, Field
from typing import List
from .content_type import ContentType
from .sorting_criteria import SortingCriteria

class SearchFilters(BaseModel):

    # ContentType - standard are all
    content_types: List[ContentType] = Field(default_factory=lambda: [type.value for type in ContentType])

class SearchQueryData(BaseModel):
    
    query: str # can be empty
    filters: SearchFilters = Field(default_factory=SearchFilters)
    sort_by: SortingCriteria = SortingCriteria.relevance