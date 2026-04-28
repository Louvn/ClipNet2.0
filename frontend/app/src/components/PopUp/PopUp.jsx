import styles from "./styles.module.css";
import DarkOverlay from "../DarkOverlay";

function PopUp({children, className, closingMethod}) {
    return <>
        <div className={`${className || ""} ${styles.PopUp}`}>
            {children}
        </div>

        <DarkOverlay onClick={closingMethod} />
    
    </>
}

export default PopUp;