import { Link, useSearchParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import { useEffect, useState } from "react";
import SearchResult from "../../components/SearchResult";
import styles from "./styles.module.css";
import Medium from "../../components/Medium";
import Loader from "../../components/Loader";
import SimpleButton from "../../components/SimpleButton";

function Search() {
    const [params] = useSearchParams();

    const [query, setQuery] = useState(params.get("query") ?? "");
    const [filters, setFilters] = useState({});

    const [selectedContentTypes, setSelectedContentTypes] = useState([]);

    const { results, loading } = useSearch(query, filters);

    useEffect(() => setQuery(params.get("query") ?? ""), [params]);


    // handle the onChange of the Content Type Checkboxes to change the state
    const onChangeContentTypeCheckbox = (c) => {

        setSelectedContentTypes(
            selectedContentTypes.includes(c.target.name)
            ? selectedContentTypes.filter(e => e !== c.target.name)
            : [...selectedContentTypes, c.target.name]
        )

    }

    // apply filters (adding them to the state the search has as dependency)
    const applyFilters = () => {
        setFilters({
            "content_type": selectedContentTypes
        })
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

            </aside>

            <main className={styles.SearchResults}>
                <h2>Search Results:</h2>
                {!loading && results?.map(e => <SearchResult showContent data={e} key={`${e.type}-${e?.slug || e?.username}`} />)}

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