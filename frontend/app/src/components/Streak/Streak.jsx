import styles from "./styles.module.css";
import streakIcon from "../../assets/icons/streak.png";

function Streak() {
    return <div className={styles.Streak}>
        <img src={streakIcon} alt="current streak" />
        <span className={styles.StreakCounter}>12</span>
    </div>
}

export default Streak;