import { useLocation, useNavigate } from "react-router-dom";
import SimpleButton from "../../components/SimpleButton";
import styles from "./styles.module.css";
import icon from "../../assets/icons/network_error.svg";

function NetworkError() {

    const navigate = useNavigate();
    const location = useLocation();

    return <div className={styles.NetworkError}>
        <img src={icon} alt="network error" className={styles.Icon} />
        <h2 className={styles.Title}>Seems like we could not reach the ClipNet Servers.</h2>
        <p className={styles.InfoText}>This error means your device failed to reach the ClipNet Servers. If this isn't caused by your Internet connection, the Server may be sleeping. Try again in a few minutes. If the problem remains, please report it to the owner.</p>
        
        <SimpleButton onClick={() => navigate(location.state?.from || "/", { state: location.state?.initialState })}>Try Again</SimpleButton>
    </div>
}

export default NetworkError;