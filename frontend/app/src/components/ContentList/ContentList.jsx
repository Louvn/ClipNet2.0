import { useSearch } from "../../hooks/useSearch";
import styles from "./styles.module.css";
import SearchResult from "../SearchResult";
import Loader from "../Loader";

function ContentList({query, filters, sort, title, showFullContent=false}) {

    const { results, loading } = useSearch(query);

    return <div className={styles.ListCard}>
        <h2 className={styles.Title}>{title}</h2>
        <hr />

        <div className={styles.Results}>
            {!loading && results?.map(result => (
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