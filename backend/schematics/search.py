from pydantic import BaseModel, constr, Field
from typing import List, Optional
from .content_type import ContentType

class SearchFilters(BaseModel):

    # ContentType - standard are all
    content_types: List[ContentType] = Field(default_factory=lambda: [type.value for type in ContentType])

class SearchQueryData(BaseModel):
    query: constr(min_length=1)
    filters: SearchFilters = Field(default_factory=SearchFilters)