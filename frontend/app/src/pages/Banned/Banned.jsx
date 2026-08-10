import styles from "./styles.module.css";
import icon from "../../assets/icons/ban.svg";
import { useTranslation } from "react-i18next";

function Banned() {

    const {t} = useTranslation();

    return <div className={styles.Banned}>
        <img src={icon} alt={t("error.banned.alt")} className={styles.Icon} />
        <h2 className={styles.Title}>{t("error.banned.title")}</h2>
        <p className={styles.InfoText}>{t("error.banned.description")}</p>
    </div>
}

export default Banned;