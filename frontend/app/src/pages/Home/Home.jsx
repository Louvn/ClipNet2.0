import styles from "./styles.module.css";
import ContentList from "../../components/ContentList";
import Medium from "../../components/Medium";
import { useTranslation } from "react-i18next";
import StatisticCards from "../../components/StatisticCards/StatisticCards";

function Home() {

    const {t} = useTranslation();

    return <Medium className={styles.HomePage}>
        
        <StatisticCards />

        <h2 className={styles.Heading}>{t("quote")}</h2>

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