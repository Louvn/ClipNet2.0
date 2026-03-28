from pydantic import BaseModel, constr
from typing import List, Optional
from .content_type import ContentType

class SearchFilters(BaseModel):

    owner: Optional[str] # TODO: Make this filter work

    # ContentType - standard are all
    content_types: List[ContentType] = [type.value for type in ContentType] 

class SearchQueryData(BaseModel):
    query: constr(min_length=1)
    filters: SearchFilters