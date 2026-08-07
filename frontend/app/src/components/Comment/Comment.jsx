import { Link } from "react-router-dom";
import wikitextToJsx from "../../wikitext-engine";
import styles from "./styles.module.css";
import wikitextStyles from "../../wikitext-engine/styles.module.css";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { useTranslation } from "react-i18next";

function Comment({ data }) {

    const rendered = wikitextToJsx(data.content, false);
    const {t} = useTranslation();

    return <div>
        <div className={styles.CommentMetaData}>
            <Link to={`/community/user/${data.user.id}`} className={wikitextStyles.UserLink}>@{data.user.username}</Link>
            <span>{formatTimestamp(data.created_at, t)}</span>
        </div>
        <span className={styles.CommentContent}>{rendered}</span>
        <hr/>
    </div>
}

export default Comment;