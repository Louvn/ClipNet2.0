import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function SearchResult({data, showContent=false}) {

    let title, info, content, link;

    switch (data.type) {
        case "article":
            title = data.current_revision.title;
            info = `by ${data.op.username}`;
            content = data.current_revision.content;
            link = `/wiki/${data.slug}`;
            break;

        case "user":
            title = data.username;
            info = "user";
            content = "user";
            link = `/@${data.username}`;
            break;
    }

    return <Link to={link} className={`${styles.SearchResult} ${styles[data.type]} ${showContent ? styles.showContent : ""}`}>
        <h3 className={styles.SearchResultTitle}>{title}</h3>
        <span className={styles.SearchResultAuthor}>{info}</span>
        <p className={styles.SearchResultContent}>
            {
                content.split(" ").length > 20
                ? content.split(" ").slice(0, 20).join(" ") + " ..."
                : content
            }
        </p>
    </Link>
}

export default SearchResult;