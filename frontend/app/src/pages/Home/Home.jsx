import styles from "./styles.module.css";
import ContentList from "../../components/ContentList";
import Medium from "../../components/Medium";
import { useTranslation } from "react-i18next";
import StatisticCards from "../../components/StatisticCards/StatisticCards";
import { useAnnouncements } from "../../hooks/useAnnouncements";
import { Link } from "react-router-dom";

function Home() {

    const {t} = useTranslation();
    const {announcements, loading} = useAnnouncements();
    let announcement = !loading ? announcements[Math.floor(Math.random() * announcements.length)] : null;

    return <Medium className={styles.HomePage}>
        
        <StatisticCards />

        <h2 className={styles.Heading}>{announcement ? announcement.title : t("quote")}</h2>
        {announcement && <p className={styles.AnnouncementMessage}>{announcement.message} - <Link to={announcement.link} className={styles.LearnMore}>{t("common.learnMore")}</Link></p>}


        <svg viewBox="0 0 1440 150" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className={styles.Wave}>
            <path d="M0,80 C240,150 480,0 720,80 C960,150 1200,0 1440,80 L1440,150 L0,150 Z" />
        </svg>

        <div className={styles.MainSection} >

            <ContentList 
                query="" 
                title={t("article.latestArticles")}
                filters={{ content_type: ["article"] }}
                sort_by="newest_first" 
                showFullContent
                />

            <ContentList 
                query="" 
                title={t("article.latestChanges")}
                filters={{ content_type: ["article"] }}
                sort_by="last_updated_first" 
                showFullContent 
                />

        </div>

    </Medium>
}

export default Home;