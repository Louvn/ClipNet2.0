import styles from "./styles.module.css";
import Searchbar from "../Searchbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstantSearchResult from "../InstantSearchResult";
import apiFetch from "../../utils/ApiFetch";
import Loader from "../Loader";

function InstantSearch() {

    const [showInstantSearch, setShowInstantSearch] = useState(false);

    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);
    const [gotValidData, setGotValidData] = useState(false);


    // load results
    useEffect(() => {

        if (!query) return;
        
        // to show loading animation EVERY time
        setGotValidData(false);
        
        apiFetch("/search", { 
                method: "POST",
                body: JSON.stringify({ query: query })
            })

            .then(res => res.json())
            .then(data => {
                setResults(data.slice(0, 4));

                setGotValidData(true);
            })

    }, [query]);


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



    return <div className={`${styles.InstantSearch} ${showInstantSearch ? styles.Show : ""}`}>
        <Searchbar 
            onChange={handleChange}
            onBlur={() => setShowInstantSearch(false)}
            onFocus={handleFocus}
            />

        <div className={styles.InstantSearchResults}>

            {gotValidData && results.map(result => {

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

    
            {(results.length === 0 && gotValidData)&& <em className={styles.NothingFound}>Nothing found</em>}


            {!gotValidData && <Loader divHidden />}

            <Link to="#" className={styles.ShowAll}>Show All</Link>
        </div>

    </div>
}

export default InstantSearch;