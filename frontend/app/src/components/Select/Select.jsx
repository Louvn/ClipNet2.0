import styles from "./styles.module.css";

function Select({children, ...props}) {

    return <select {...props} className={styles.Select}>{children}</select>
}

export default Select;