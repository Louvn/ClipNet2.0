import { useSearch } from "../../hooks/useSearch";
import styles from "./styles.module.css";
import SearchResult from "../SearchResult";
import Loader from "../Loader";
import { Link } from "react-router-dom";

function ContentList({query, filters, sort_by, title, maxResults=3, showFullContent=false}) {

    const { results, loading } = useSearch(query, filters, sort_by, 0, maxResults);

    return <div className={styles.ListCard}>
        <h2 className={styles.Title}>
            {title}
            <Link className={styles.SearchLink} to={"/search"} state={{ filters: filters, sort_by: sort_by, query: query}}>More</Link>
        </h2>
        <hr />

        <div className={styles.Results}>
            {!loading && results?.slice(0, maxResults).map(result => (
                <SearchResult 
                    data={result}
                    query={query}
                    key={`${result.type}${result.id}`}
                    showContent={showFullContent}
                    />
            ))}
        </div>

        {loading && <Loader />}

        {!loading && results?.length === 0 && <em className={styles.NothingFound}>Nothing Found</em>}
    </div>
}

export default ContentList;