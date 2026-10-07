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
import restoreIcon from "../../assets/icons/revisions.png"
import changesIcon from "../../assets/icons/updated.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import PopUp from "../../components/PopUp";
import { useAPI } from "../../hooks/api/useAPI";
import { useToastNotification, notificationTypeSuccess } from "../../context/ToastNotificationContext";
import { useCache } from "../../context/CacheContext";

function Revision() {

    // article slug and revision id
    const {id, slug} = useParams();
    const navigate = useNavigate();
    const {revision, loading, status} = useRevision(id);
    const {t} = useTranslation();
    const apiFetch = useAPI();
    const toast = useToastNotification();
    const {cacheItem} = useCache();

    const [rollbackPopUpOpen, setRollbackPopUpOpen] = useState(false);

    const rollbackToRevision = async () => {

        const params = new URLSearchParams({ revision_id: id });
        const res = await apiFetch(`/restore-revision?${params}`, { method: "PUT"});

        if (!res.ok) {
            return;
        }

        cacheItem("articles", slug, null);

        toast(t("toast.revisionRestored"), notificationTypeSuccess);
        return navigate(`/wiki/${slug}`);
    }


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

                <ActionButton icon={restoreIcon} onClick={() => setRollbackPopUpOpen(true)}>{t("revision.restore")}</ActionButton>
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

        {rollbackPopUpOpen && <PopUp closingMethod={() => setRollbackPopUpOpen(false)} className={specialStyles.PopUp}>
            
            <h2>{t("revision.restore")}</h2>

            <div className={specialStyles.PopUpButtons}>
                <SimpleButton onClick={() => {rollbackToRevision(); setRollbackPopUpOpen(false)}} className={specialStyles.PopUpButton}>{t("common.yes")}</SimpleButton>
                <SimpleButton onClick={() => setRollbackPopUpOpen(false)} className={specialStyles.PopUpButtonRed}>{t("common.no")}</SimpleButton>
            </div>

        </PopUp>}

    </Medium>
}

export default Revision;