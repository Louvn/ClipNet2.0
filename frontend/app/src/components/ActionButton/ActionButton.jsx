import styles from "./styles.module.css";

function ActionButton({icon, children, onClick, className}) {
    return <button className={`${styles.ActionButton} ${className || ""}`} onClick={onClick}>
        <img className={styles.ActionButtonIcon} src={icon} alt="" />
        <span className={styles.ActionButtonText}>{children}</span>
    </button>
}

export default ActionButton;