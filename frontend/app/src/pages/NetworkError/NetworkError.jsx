import { useLocation, useNavigate } from "react-router-dom";
import SimpleButton from "../../components/SimpleButton";
import styles from "./styles.module.css";
import icon from "../../assets/icons/network_error.svg";
import { useTranslation } from "react-i18next";

function NetworkError() {

    const {t} = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();

    return <div className={styles.NetworkError}>
        <img src={icon} alt={t("error.network.alt")} className={styles.Icon} />
        <h2 className={styles.Title}>{t("error.network.title")}</h2>
        <p className={styles.InfoText}>{t("error.network.description")}</p>
        
        <SimpleButton onClick={() => navigate(location.state?.from || "/", { state: location.state?.initialState })}>{t("actions.tryAgain")}</SimpleButton>
    </div>
}

export default NetworkError;