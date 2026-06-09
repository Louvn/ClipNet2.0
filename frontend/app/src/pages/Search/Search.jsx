import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { useEffect, useState } from "react";
import SearchResult from "../../components/SearchResult";
import styles from "./styles.module.css";
import Medium from "../../components/Medium";
import Loader from "../../components/Loader";
import SimpleButton from "../../components/SimpleButton";

const resultsLength = 20;

function Search() {
    const location = useLocation();

    const [query, setQuery] = useState(location.state?.query || "");
    const [filters, setFilters] = useState(location.state?.filters || {});
    const [offset, setOffset] = useState(0);

    const currentPage = (offset / resultsLength) + 1;

    const [selectedContentTypes, setSelectedContentTypes] = useState(filters?.content_type || []);
    const [selectedSortBy, setSelectedSortBy] = useState(location.state?.sort_by || "relevance");

    useEffect(() => {
        if (query !== location.state?.query) setQuery(location.state.query);
    }, [location, query]);

    useEffect(() => window.scrollTo(0, 0), [offset]);

    const { results, loading } = useSearch(query, filters, selectedSortBy, offset, resultsLength+1); // +1 to check whether there is more


    // handle the onChange of the Content Type Checkboxes to change the state
    const onChangeContentTypeCheckbox = (c) => {

        setSelectedContentTypes(
            selectedContentTypes.includes(c.target.name)
            ? selectedContentTypes.filter(e => e !== c.target.name)
            : [...selectedContentTypes, c.target.name]
        )

    }

    const onChangeSortBySelection = (c) => {
        setSelectedSortBy(c.target.value);
    }

    // apply filters (adding them to the state the search has as dependency)
    const applyFilters = () => {
        setFilters({
            "content_type": selectedContentTypes
        });
    }


    return <Medium>
        <div className={styles.SearchPageRoot}>

            <aside className={styles.FilterOptions}>
                <SimpleButton onClick={applyFilters}>Apply Filters</SimpleButton>
                
                <fieldset>
                    <legend>Content Type</legend>

                    <label>
                        <input type="checkbox" name="article" onChange={onChangeContentTypeCheckbox} checked={selectedContentTypes.includes("article")} />
                        Article
                    </label>

                    <label>
                        <input type="checkbox" name="user" onChange={onChangeContentTypeCheckbox} checked={selectedContentTypes.includes("user")} />
                        User
                    </label>

                </fieldset>

                <fieldset>
                    <legend>Order by</legend>

                    <select onChange={onChangeSortBySelection} value={selectedSortBy} className={styles.SortBySelect}>
                        <option value="relevance">Relevance</option>
                        <option value="newest_first">Newest first</option>
                        <option value="oldest_first">Oldest first</option>
                        <option value="last_updated_first">Last updated first</option>
                    </select>
                </fieldset>

            </aside>

            <main className={styles.SearchResults}>
                <h2>Search Results:</h2>
                {!loading && results?.slice(0, 20).map(e => <SearchResult showContent data={e} query={query} key={`${e.type}-${e?.slug || e?.username}`} />)}

                {loading && <Loader divHidden />}

                {!loading && results.length === 0 && 
                    <em>
                        No results found matchig your filters <br />
                        <Link className={styles.CreateArticleLink} to={`/editor?title=${query}`}>Do you want to create '{query}'?</Link>
                    </em>}
                
                { !loading && results && <div className={styles.Pagination}>
                    <button onClick={() => setOffset(offset - resultsLength)} disabled={currentPage === 1}>{"<"}</button>
                    <span>{ currentPage }</span>
                    <button onClick={() => setOffset(offset + resultsLength)} disabled={results.length <= resultsLength}>{">"}</button>
                </div>}
        
            </main>
        </div>
    </Medium>
}

export default Search;