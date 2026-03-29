import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function InstantSearchResult({type, title, author, link}) {

    let typeClass = "";
    if (type === "user") typeClass = styles.User;

    return <Link to={link} className={`${styles.InstantSearchResult} ${typeClass}`}>
        <span className={styles.InstantSearchResultTitle}>{title}</span>
        <span className={styles.InstantSearchResultAuthor}>{author}</span>
    </Link>
}

export default InstantSearchResult;