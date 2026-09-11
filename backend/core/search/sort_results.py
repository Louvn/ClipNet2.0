from .ranking import rank
from ...schematics.sorting_criteria import SortingCriteria
from .dynamic_columns import *
from ...utils.deep_getattr import deep_getattr

def get_likes(r):
    column = deep_getattr(r, LIKED_BY_COLUMN[r.type])

    if not column:
        return 0
    return len(column)


def sort_results(query, results, criteria):

    sorted_results = []

    match criteria:

        case SortingCriteria.relevance:

            # Sort by the highest rank
            sorted_results = sorted(
                results,
                key=lambda r: rank(
                    deep_getattr(r, PRIMARY_CONTENT_FOR_RANKING[r.type]), # getting right columns for every type to rank
                    deep_getattr(r, SECONDARY_CONTENT_FOR_RANKING[r.type]),
                    query
                ),
                reverse=True
            )


        case SortingCriteria.newest_first:

            # sort by datetime (newest first)
            sorted_results = sorted(
                results,
                key=lambda r: deep_getattr(r, CREATED_AT_COLUMN[r.type]),
                reverse=True
            )

        case SortingCriteria.oldest_first:

            # sort by datetime (oldest first)
            sorted_results = sorted(
                results,
                key=lambda r: deep_getattr(r, CREATED_AT_COLUMN[r.type])
            )

        
        case SortingCriteria.last_updated_first:

            # sort by datetime of last change (last updated first)
            sorted_results = sorted(
                results,
                key=lambda r: deep_getattr(r, LAST_UPDATED_AT_COLUMN[r.type]),
                reverse=True
            )

        case SortingCriteria.most_liked_first:

            # sort by number of likes (most likes first)
            sorted_results = sorted(
                results,
                key=lambda r: get_likes(r),
                reverse=True
            )
    


    return sorted_results