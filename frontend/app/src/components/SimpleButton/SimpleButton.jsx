import styles from "./styles.module.css";

function SimpleButton({children, className, onClick, disabled, type}) {
    return <button onClick={onClick} disabled={disabled} type={type || "button"} className={`${styles.SimpleButton} ${className || ""}`}>
        {children}
    </button>
}

export default SimpleButton;