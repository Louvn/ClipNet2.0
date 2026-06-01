import { Link, useSearchParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import ContentList from "../../components/ContentList";
import { useEffect, useState } from "react";
import SearchResult from "../../components/SearchResult";
import styles from "./styles.module.css";
import Medium from "../../components/Medium";
import Loader from "../../components/Loader";

function Search() {
    const [params] = useSearchParams();

    const [query, setQuery] = useState(params.get("query"));
    const [filters, setFilters] = useState({});
    const [selectedFilters, setSelectedFilters] = useState({});
    const { results, loading } = useSearch(query, filters);

    useEffect(() => setQuery(params.get("query")), [params])

    return <Medium>
        <div className={styles.SearchPageRoot}>

            <aside>

            </aside>

            <main className={styles.SearchResults}>
                <h2>Search Results:</h2>
                {!loading && results?.map(e => <SearchResult showContent data={e} />)}

                {loading && <Loader />}

                {!loading && results.length === 0 && 
                    <em>
                        This does not exist. <br />
                        <Link className={styles.CreateArticleLink} to={`/editor?title=${query}`}>Do you want to create it?</Link>
                    </em>}

            </main>
        </div>
    </Medium>
}

export default Search;