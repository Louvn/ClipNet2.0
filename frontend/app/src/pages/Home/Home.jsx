import styles from "./styles.module.css";
import heroSectionIllustration from "../../assets/illustrations/knight.png";
import ContentList from "../../components/ContentList";

function Home() {
    return <div className={`medium ${styles.HomePage}`}>

        <div className={styles.HeroSection}>

            <div className={styles.HeroSectionLeft}>
                <h1 className={styles.HeroSectionHeading}>
                    let your <span className={styles.RegularColor}>Creativity</span>
                    <br />
                    <span className={styles.ItalicTransparent}>flow</span> and shape
                    <br />
                    this <span className={styles.Underlined}>World</span>
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

            <ContentList query="s" title="Lustige Artikel"/>
            <ContentList query="s" title="Bessere Artikel" showFullContent />
        </div>

    </div>
}

export default Home;