import ActionButton from "../ActionButton";
import shareIcon from "../../assets/icons/share.png";
import { useLocation } from "react-router-dom";
import { useToastNotification } from "../../context/ToastNotificationContext";
import { useTranslation } from "react-i18next";

function ShareButton({ title }) {

    const {t} = useTranslation();
    const location = useLocation();
    const toastNotification = useToastNotification();

    const share = () => {
        if (!navigator.share) return toastNotification(t("toast.browserDoesNotSupport"));

        navigator.share({
            title: `${document.title}: ${title}`,
            url: location.pathname,
            text: `Check out '${title}' on ClipNet!`
        })
    }

    return <ActionButton
        icon={shareIcon}
        onClick={share}
    >{t("actions.share")}</ActionButton>
}

export default ShareButton;