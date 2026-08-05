import styles from "./styles.module.css";
import heroSectionIllustration from "../../assets/illustrations/knight.png";
import ContentList from "../../components/ContentList";
import { useStats } from "../../hooks/useStats";
import Medium from "../../components/Medium";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Home() {

    const {t} = useTranslation();
    const {stats, loading} = useStats();
    const navigate = useNavigate();


    return <Medium className={styles.HomePage}>
        
        <div className={styles.HeroSection}>

            <div className={styles.HeroSectionLeft}>
                <h1 className={styles.HeroSectionHeading}>
                    <span className={styles.RegularColor}>{loading ? "[?]" : stats.articles}</span> Articles
                    <br />
                    made by <span className={styles.ItalicTransparent}>{loading ? "[?]" : stats.users}</span> Users.
                    <br />
                    Go <span className={styles.Underlined}>explore</span> it!*
                </h1>

                <div>
                    <button className={styles.Button} onClick={() => navigate("/editor")}>Create Something*</button>
                    <button className={`${styles.Button} ${styles.Grey}`}>Learn More*</button>
                </div>
            </div>

            <img src={heroSectionIllustration} alt="" className={styles.HeroSectionIllustration} />


        </div>


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