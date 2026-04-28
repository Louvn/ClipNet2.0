import styles from "./styles.module.css";

function Medium({children, className}) {
    return <div className={`${styles.Medium} ${className}`}>
        {children}
    </div>
}

export default Medium;