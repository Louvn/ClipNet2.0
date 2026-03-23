import styles from "./styles.module.css";

function ActionButton({icon, text}) {
    return <button className={styles.ActionButton}>
        <img className={styles.ActionButtonIcon} src={icon} alt="" />
        <span className={styles.ActionButtonText}>{text}</span>
    </button>
}

export default ActionButton;