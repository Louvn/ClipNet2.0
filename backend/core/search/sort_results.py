from .ranking import rank
from ...schematics.sorting_criteria import SortingCriteria
from .dynamic_columns import PRIMARY_CONTENT_FOR_RANKING, SECONDARY_CONTENT_FOR_RANKING
from ...utils.deep_getattr import deep_getattr


def sort_results(query, results, criteria):

    sorted_results = []

    match criteria:

        case SortingCriteria.relevance:

            # Sort by the highest rank
            sorted_results = sorted(
                results,
                key=lambda r: rank(
                    deep_getattr(r, PRIMARY_CONTENT_FOR_RANKING[r.type]),
                    deep_getattr(r, SECONDARY_CONTENT_FOR_RANKING[r.type]),
                    query
                ),
                reverse=True
            )


        case SortingCriteria.newest_first:
            ...
            # TODO
    

    return sorted_results