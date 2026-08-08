import { useStats } from "../../hooks/useStats";
import styles from "./styles.module.css";
import heroSectionIllustration from "../../assets/illustrations/knight.png";

function HeroSection() {

    const {stats, loading} = useStats();

    return <div className={styles.HeroSection}>

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
}