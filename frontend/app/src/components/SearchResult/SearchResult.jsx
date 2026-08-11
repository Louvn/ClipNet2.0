import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import renderPreview from "../../wikitext-engine/previews";
import { highlightQuery } from "../../wikitext-engine/previews";
import { useTranslation } from "react-i18next";

function SearchResult({data, query, showContent=false}) {

    let title, info, content, link;
    const {t} = useTranslation();

    switch (data.type) {
        case "article":
            title = data.current_revision.title;
            info = t("common.createdByUser", {user: data.op.username});
            content = renderPreview(data.current_revision?.content || "", query);
            link = `/wiki/${data.slug}`;
            break;

        case "user":
            title = "@" + data.username;
            info = t("user.title");
            content = data.bio ? renderPreview(data.bio, query) : t("user.title");
            link = `/community/user/${data.id}`;
            break;
        
        default:
            break;
    }

    return <Link to={link} className={`${styles.SearchResult} ${styles[data.type]} ${showContent ? styles.showContent : ""}`}>
        <h3 className={styles.SearchResultTitle}>{highlightQuery(title, query)}</h3>
        <span className={styles.SearchResultAuthor}>{info}</span>
        <p className={styles.SearchResultContent}>{content}</p>
    </Link>
}

export default SearchResult;