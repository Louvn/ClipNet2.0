import { useLocation, useNavigate } from "react-router-dom";
import SimpleButton from "../../components/SimpleButton";
import styles from "./styles.module.css";

function NetworkError() {

    const navigate = useNavigate();
    const location = useLocation();

    return <div className={styles.NotFound}>
        <h1 className={styles.NotFoundCode}>Network Error</h1>
        <h2 className={styles.NotFoundTitle}>Seems like we could not reach the ClipNet Servers.</h2>
        
        <SimpleButton onClick={() => navigate(location.state?.from || "/", { state: location.state?.initialState })}>Try Again</SimpleButton>
    </div>
}

export default NetworkError;