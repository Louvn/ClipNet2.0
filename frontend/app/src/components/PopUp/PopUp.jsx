import styles from "./styles.module.css";
import DarkOverlay from "../DarkOverlay";

function PopUp({children, className, closingMethod}) {
    return <>
        <div className={`${styles.PopUp} ${className || ""}`}>
            {children}
        </div>

        <DarkOverlay onClick={closingMethod} />
    
    </>
}

export default PopUp;