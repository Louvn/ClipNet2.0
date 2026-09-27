import styles from "./styles.module.css";
import ContentList from "../../components/ContentList";
import Medium from "../../components/Medium";
import { useTranslation } from "react-i18next";
import StatisticCards from "../../components/StatisticCards/StatisticCards";
import { useAnnouncements } from "../../hooks/useAnnouncements";
import { Link } from "react-router-dom";
import { useImageIndex } from "../../context/ImageIndexContext";
import { useAuth } from "../../context/AuthContext";

function Home() {

    const {t} = useTranslation();
    const {user} = useAuth();
    const {announcements, loading} = useAnnouncements();
    let announcement = !loading ? announcements[Math.floor(Math.random() * announcements.length)] : null;

    // daily background image
    const imageIndex = useImageIndex();
    const images = [...imageIndex.values()].filter(i => i.hero_eligible === true);

    const day = Math.floor(Date.now() / 86400000);
    const random = Math.sin(day * 12345.6789) * 10000;
    const index = Math.floor((random - Math.floor(random)) * images.length);
    const heroImage = images.length > 0 ? images[index] : null;


    return <Medium 
        className={`${styles.HomePage} ${heroImage && styles.ImageShown}`}
        style={{ backgroundImage: heroImage ? `linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5)), url(${heroImage?.url})` : undefined}}
    >
        
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
            
            <ContentList 
                query="" 
                title={t("article.mostLiked")}
                filters={{ content_type: ["article"] }}
                sort_by="most_liked_first" 
                showFullContent 
                />

            <ContentList 
                query="" 
                title={t("article.yourMostLiked")}
                filters={{ content_type: ["article"], op_id: user?.id }}
                sort_by="most_liked_first" 
                showFullContent 
                />

        </div>

    </Medium>
}

export default Home;