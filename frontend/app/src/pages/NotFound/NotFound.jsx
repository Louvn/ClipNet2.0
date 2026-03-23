import styles from "./styles.module.css";

function NotFound() {
    return <div className={styles.NotFound}>
        <h1 className={styles.NotFoundCode}>404</h1>
        <h2 className={styles.NotFoundTitle}>Page Not found</h2>
        <em className={styles.NotFoundQuote}>„You have stepped onto a path even the oldest chronicles do not know.“</em>
    </div>
}

export default NotFound;