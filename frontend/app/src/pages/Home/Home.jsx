import styles from "./styles.module.css";
import heroSectionIllustration from "../../assets/illustrations/knight.png";
import ContentList from "../../components/ContentList";
import { useStats } from "../../hooks/useStats";

function Home() {

    const {stats, loading} = useStats();


    return <Medium className={styles.HomePage}>

        <div className={styles.HeroSection}>

            <div className={styles.HeroSectionLeft}>
                <h1 className={styles.HeroSectionHeading}>
                    It's <span className={styles.RegularColor}>{loading ? "[?]" : stats.articles}</span> Articles
                    <br />
                    Made by <span className={styles.ItalicTransparent}>{loading ? "[?]" : stats.users}</span> Users.
                    <br />
                    Go <span className={styles.Underlined}>Explore</span> it!
                </h1>

                <div>
                    <button className={styles.Button}>Create Something</button>
                    <button className={`${styles.Button} ${styles.Grey}`}>Learn More</button>
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
                title="Latest Articles"
                filters={{ content_types: ["article"] }}
                sort_by="newest_first" 
                showFullContent
                />

            <ContentList 
                query="" 
                title="Latest Changes" 
                filters={{ content_types: ["article"] }}
                sort_by="last_updated_first" 
                showFullContent 
                />

        </div>

    </Medium>
}

export default Home;