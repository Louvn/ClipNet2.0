import styles from "./styles.module.css";

function Medium({children, className, ...args}) {
    return <div className={`${styles.Medium} ${className}`} {...args}>
        {children}
    </div>
}

export default Medium;