import { useSearch } from "../../hooks/useSearch";
import styles from "./styles.module.css";
import SearchResult from "../SearchResult";
import Loader from "../Loader";

function ContentList({query, filters, sort_by, title, maxResults=3, showFullContent=false}) {

    const { results, loading } = useSearch(query, filters, sort_by);

    return <div className={styles.ListCard}>
        <h2 className={styles.Title}>{title}</h2>
        <hr />

        <div className={styles.Results}>
            {!loading && results?.slice(0, maxResults).map(result => (
                <SearchResult 
                    data={result}
                    key={`${result.type}${result.id}`}
                    showContent={showFullContent}
                    />
            ))}
        </div>

        {loading && <Loader />}

        {!loading && results?.length === 0 && <em>Nothing Found</em>}
    </div>
}

export default ContentList;