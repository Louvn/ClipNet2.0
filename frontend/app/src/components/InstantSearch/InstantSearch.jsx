import styles from "./styles.module.css";
import Searchbar from "../Searchbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstantSearchResult from "../SearchResult";
import { useWikiIndex } from "../../context/WikiIndexContext";
import { useUserIndex } from "../../context/UserIndexContext";
import { useTranslation } from "react-i18next";

function InstantSearch() {

    const {t} = useTranslation();
    const [showInstantSearch, setShowInstantSearch] = useState(false);

    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);

    const wikiIndex = useWikiIndex();
    const userIndex = useUserIndex();


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

    // get quick results via wiki and user index
    useEffect(() => {

        if (!query) return;

        const foundArticles = Array.from(
            wikiIndex.values()
        ).filter(
            a => a.current_revision.title.toLowerCase().includes(query.toLowerCase())
        ).map(e => ({ ...e, type: "article" }));

        const foundUsers = Array.from(
            userIndex.values()
        ).filter(
            u => u.username.toLowerCase().includes(query.toLowerCase())
        ).map(e => ({ ...e, type: "user" }));

        setResults(
            [...foundUsers, ...foundArticles]
        );

    }, [query, wikiIndex, userIndex])


    return <div className={`${styles.InstantSearch} ${showInstantSearch ? styles.Show : ""}`}>
        <Searchbar 
            onChange={handleChange}
            onBlur={() => setTimeout(() => setShowInstantSearch(false), 200)}
            onFocus={handleFocus}
            />

        <div className={styles.InstantSearchResults}>

            {results?.slice(0, 4).map(result => (

                <InstantSearchResult data={result} key={`${result.type}-${result?.slug || result?.username}`} />
            ))}

            <Link to={"/search"} state={{ query: query }} className={styles.ShowAll}>{t("search.showAllResults")}</Link>
        </div>

    </div>
}

export default InstantSearch;