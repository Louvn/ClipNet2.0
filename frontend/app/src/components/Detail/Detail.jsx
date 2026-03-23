import styles from "./styles.module.css";

function Detail({icon, text}) {
    return <div className={styles.Detail}>
        <img className={styles.DetailIcon} src={icon} alt="" />
        <span className={styles.DetailText}>{text}</span>
    </div>
}

export default Detail;