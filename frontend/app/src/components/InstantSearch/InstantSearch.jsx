import styles from "./styles.module.css";
import Searchbar from "../Searchbar";
import { useState } from "react";
import { Link } from "react-router-dom";
import InstantSearchResult from "../InstantSearchResult";

function InstantSearch() {

    const [showInstantSearch, setShowInstantSearch] = useState(false);

    // handle changes in search query
    const handleChange = (e) => {

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
        if (e.target.value.trim()) {
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
            <InstantSearchResult />
            <InstantSearchResult />
            <InstantSearchResult />

            <Link to="#" className={styles.ShowAll}>Show All</Link>
        </div>
    </div>
}

export default InstantSearch;