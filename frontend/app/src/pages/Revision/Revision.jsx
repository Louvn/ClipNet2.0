import { useNavigate, useParams } from "react-router-dom";
import Medium from "../../components/Medium";
import Loader from "../../components/Loader";
import { useRevision } from "../../hooks/api/useRevision";
import wikitextToJsx from "../../wikitext-engine";
import styles from "../Article/styles.module.css";
import specialStyles from "./styles.module.css";
import ActionButton from "../../components/ActionButton";
import SimpleButton from "../../components/SimpleButton";
import Detail from "../../components/Detail";
import { formatTimestamp } from "../../utils/formatTimestamp";
import createdIcon from "../../assets/icons/created.png"
import rollbackIcon from "../../assets/icons/revisions.png"
import changesIcon from "../../assets/icons/updated.png";
import { useTranslation } from "react-i18next";

function Revision() {

    // article slug and revision id
    const {id} = useParams();
    const navigate = useNavigate();
    const {revision, loading, status} = useRevision(id);
    const {t} = useTranslation();

    if (loading) return <Medium>
        <Loader />
    </Medium>;

    if (status === 404) navigate("/404");
    
    if (!loading && revision) return <Medium className={styles.ArticlePageRoot}>
        
        <aside className={styles.Sidebar}>

            <SimpleButton onClick={() => navigate(-1)} className={specialStyles.BackToHistory}>← {t("common.back")}</SimpleButton>

            <section className={styles.SidebarSection}>
                <h2>#{revision.id}</h2>

                <Detail
                    text={t("article.createdByUser", {user: revision.user.username, time: formatTimestamp(revision.created_at, t)})} 
                    icon={createdIcon} 
                    link={`/community/user/${revision.user.id}`}
                    />
                
                {revision.change_summary?.length > 0 && <Detail
                    text={revision.change_summary}
                    icon={changesIcon}
                    />}
            </section>

            <section className={`${styles.SidebarSection} ${styles.Actions}`}>
                <h2>{t("common.actions")}</h2>

                <ActionButton icon={rollbackIcon}>{t("revision.rollback")}</ActionButton>
            </section>

        </aside>

        <main className={styles.ArticleMain}>
            <h1 className={styles.ArticleMainTitle}>{revision.title}</h1>
            <hr />
            <div className={styles.ArticleMainContent}>
                <div className={specialStyles.Warning}>[!] {t("revision.oldRevisionWarning")}</div>
                {wikitextToJsx(revision.content)}
            </div>
        </main>

    </Medium>
}

export default Revision;