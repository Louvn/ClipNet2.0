import styles from "./styles.module.css";
import Searchbar from "../Searchbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import InstantSearchResult from "../InstantSearchResult";
import { useSearch } from "../../hooks/useSearch";
import Loader from "../Loader";

function InstantSearch() {

    const [showInstantSearch, setShowInstantSearch] = useState(false);

    const [query, setQuery] = useState("");


    // handle changes in search query
    const handleChange = (e) => {
        
        setQuery(e.target.value.trim());

        // show instantSearch only when typing in something
        if (e.target.value.trim()) {
            setShowInstantSearch(true);
        } else {
            setShowInstantSearch(false);
        }
    
    }

    // handle focusing the search
    const handleFocus = (e) => {

        // show instantSearch only when something is already typed in
        if (query) {
            setShowInstantSearch(true);
        }
    }

    // get results via custom hook
    const { results, loading } = useSearch(query);


    return <div className={`${styles.InstantSearch} ${showInstantSearch ? styles.Show : ""}`}>
        <Searchbar 
            onChange={handleChange}
            onBlur={() => setShowInstantSearch(false)}
            onFocus={handleFocus}
            />

        <div className={styles.InstantSearchResults}>

            {!loading && results?.map(result => {

                if (result.type === "article") return <InstantSearchResult 
                    type={result.type} 
                    title={result.current_revision.title} 
                    author={`by ${result.op.username}`} 
                    link={`/wiki/${result.slug}`} />;

                if (result.type === "user") return <InstantSearchResult 
                    type={result.type} 
                    title={`@${result.username}`} 
                    author="" 
                    link={`/community/user/`} />;

                return null;
            })}

    
            {(results?.length === 0 && !loading) && <em className={styles.NothingFound}>Nothing found</em>}

            {loading && <Loader divHidden />}

            <Link to="#" className={styles.ShowAll}>Show All</Link>
        </div>

    </div>
}

export default InstantSearch;