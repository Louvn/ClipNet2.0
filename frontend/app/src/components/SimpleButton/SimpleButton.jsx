import styles from "./styles.module.css";

function SimpleButton({children, className, onClick, disabled}) {
    return <button onClick={onClick} disabled={disabled} className={`${styles.SimpleButton} ${className || ""}`}>
        {children}
    </button>
}

export default SimpleButton;