from .search_articles import search_articles
from .search_users import search_users
from .sort_results import sort_results
from ...schematics.content_type import ContentType
from ...schematics.article import ArticleOutData
from ...schematics.user import UserOutData

# All Types with their own function to search
SEARCH_FUNCTIONS = {
    ContentType.article: search_articles,
    ContentType.user: search_users
}

# All Types with validation schematic
VALIDATION_SCHEMATICS = {
    ContentType.article:  ArticleOutData,
    ContentType.user: UserOutData
}


# -- main search function --
def search(query, filters, sort_by, db):

    results = []

    # - get results & validate them -
    for type, func in SEARCH_FUNCTIONS.items():

        if type not in filters.content_types:
            continue
        
        # get
        results_of_type = func(query, filters, db)

        # validate & add to all the results
        results.extend(
            [VALIDATION_SCHEMATICS[type].model_validate(r, from_attributes=True) for r in results_of_type]
        )


    # - sort results -
    sorted_results = sort_results(query, results, criteria=sort_by)


    return sorted_results