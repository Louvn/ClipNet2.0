import styles from "./styles.module.css";
import icon from "../../assets/icons/ban.svg";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Banned() {

    const {t} = useTranslation();
    const {isLoggedIn} = useAuth();
    const navigate = useNavigate();

    if (!isLoggedIn) return navigate("/login");

    return <div className={styles.Banned}>
        <img src={icon} alt={t("error.banned.alt")} className={styles.Icon} />
        <h2 className={styles.Title}>{t("error.banned.title")}</h2>
        <p className={styles.InfoText}>{t("error.banned.description")}</p>
    </div>
}

export default Banned;