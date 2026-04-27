import styles from "./styles.module.css";

function ActionButton({icon, text, onClick}) {
    return <button className={styles.ActionButton} onClick={onClick}>
        <img className={styles.ActionButtonIcon} src={icon} alt="" />
        <span className={styles.ActionButtonText}>{text}</span>
    </button>
}

export default ActionButton;