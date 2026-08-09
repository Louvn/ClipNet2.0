import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function Detail({icon, text, link}) {
    return <Link className={styles.Detail} to={link}>
        <img className={styles.DetailIcon} src={icon} alt="" />
        <span className={styles.DetailText}>{text}</span>
    </Link>
}

export default Detail;