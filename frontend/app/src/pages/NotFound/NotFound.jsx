import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";

function NotFound() {

    const {t} = useTranslation();

    return <div className={styles.NotFound}>
        <h1 className={styles.NotFoundCode}>404</h1>
        <h2 className={styles.NotFoundTitle}>{t("error.404.title")}</h2>
        <em className={styles.NotFoundQuote}>„{t("error.404.quote")}“</em>
    </div>
}

export default NotFound;