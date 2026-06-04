import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import renderPreview from "../../wikitext-engine/previews";
import { highlightQuery } from "../../wikitext-engine/previews";

function SearchResult({data, query, showContent=false}) {

    let title, info, content, link;

    switch (data.type) {
        case "article":
            title = data.current_revision.title;
            info = `by ${data.op.username}`;
            content = renderPreview(data.current_revision?.content || "", query);
            link = `/wiki/${data.slug}`;
            break;

        case "user":
            title = "@" + data.username;
            info = "user";
            content = "user";
            link = `/community/user/${data.username}`;
            break;
    }

    return <Link to={link} className={`${styles.SearchResult} ${styles[data.type]} ${showContent ? styles.showContent : ""}`}>
        <h3 className={styles.SearchResultTitle}>{highlightQuery(title, query)}</h3>
        <span className={styles.SearchResultAuthor}>{info}</span>
        <p className={styles.SearchResultContent}>{content}</p>
    </Link>
}

export default SearchResult;