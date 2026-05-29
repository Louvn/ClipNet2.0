import { useSearchParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import ContentList from "../../components/ContentList";
import { useState } from "react";
import SearchResult from "../../components/SearchResult";

function Search() {
    const [params] = useSearchParams();

    const [query, setQuery] = useState(params.get("query"));
    const [filters, setFilters] = useState({});
    const { results, loading } = useSearch(query, filters);

    return <>
        {!loading && results?.map(e => <SearchResult data={e} />)}
    </>
}

export default Search;