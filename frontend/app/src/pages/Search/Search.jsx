import { Link, useLocation } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { useEffect, useState } from "react";
import SearchResult from "../../components/SearchResult";
import styles from "./styles.module.css";
import Medium from "../../components/Medium";
import Loader from "../../components/Loader";
import SimpleButton from "../../components/SimpleButton";
import { useTranslation } from "react-i18next";

const resultsLength = 20;

function Search() {

    const {t} = useTranslation();
    const location = useLocation();

    const [query, setQuery] = useState(location.state?.query || "");
    const [filters, setFilters] = useState(location.state?.filters || {});
    const [offset, setOffset] = useState(0);

    const currentPage = (offset / resultsLength) + 1;

    const [selectedContentTypes, setSelectedContentTypes] = useState(filters?.content_type || []);
    const [selectedSortBy, setSelectedSortBy] = useState(location.state?.sort_by || "relevance");

    useEffect(() => {
        if (query !== location.state?.query) setQuery(location.state?.query);
    }, [location, query]);

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
                <SimpleButton onClick={applyFilters}>{t("search.applyFilters")}</SimpleButton>
                
                <fieldset>
                    <legend>{t("search.contentType")}</legend>

                    <label>
                        <input type="checkbox" name="article" onChange={onChangeContentTypeCheckbox} checked={selectedContentTypes.includes("article")} />
                        {t("article.title")}
                    </label>

                    <label>
                        <input type="checkbox" name="user" onChange={onChangeContentTypeCheckbox} checked={selectedContentTypes.includes("user")} />
                        {t("user.title")}
                    </label>

                </fieldset>

                <fieldset>
                    <legend>{t("search.orderBy")}</legend>

                    <select onChange={onChangeSortBySelection} value={selectedSortBy} className={styles.SortBySelect}>
                        <option value="relevance">{t("search.relevance")}</option>
                        <option value="newest_first">{t("search.newestFirst")}</option>
                        <option value="oldest_first">{t("search.oldestFirst")}</option>
                        <option value="last_updated_first">{t("search.lastUpdatedFirst")}</option>
                    </select>
                </fieldset>

            </aside>

            <main className={styles.SearchResults}>
                <h2>{t("search.results")}:</h2>
                
                {!loading && results?.slice(0, 20).map(e => <SearchResult showContent data={e} query={query} key={`${e.type}-${e?.slug || e?.username}`} />)}

                {loading && <Loader divHidden />}

                {!loading && results.length === 0 && 
                    <em>
                        {t("search.nothingFoundMatchingFilters")} <br />
                        {query && <Link className={styles.CreateArticleLink} to={`/editor?title=${query}`}>{t("search.createArticle", {query: query})}</Link>}
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