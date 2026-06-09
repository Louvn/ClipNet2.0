import ActionButton from "../ActionButton";
import shareIcon from "../../assets/icons/share.png";
import { useLocation } from "react-router-dom";
import { useToastNotification } from "../../context/ToastNotificationContext";

function ShareButton({ title }) {

    const location = useLocation();
    const toastNotification = useToastNotification();

    const share = () => {
        if (!navigator.share) return toastNotification("Your browser does not support this.");

        navigator.share({
            title: `${document.title}: ${title}`,
            url: location.pathname,
            text: `Check out '${title}' on ClipNet!`
        })
    }

    return <ActionButton
        icon={shareIcon}
        onClick={share}
    >share</ActionButton>
}

export default ShareButton;