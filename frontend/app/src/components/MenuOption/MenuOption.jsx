import { Link } from "react-router-dom";
import styles from "./styles.module.css";

function MenuOption({ link, onClick, title, icon }) {

    if (onClick) return <button onClick={onClick} className={styles.MenuOption}>
        <img src={icon} alt="" />
        <span>{title}</span>
    </button>;

    return <Link to={link} className={styles.MenuOption}>
        <img src={icon} alt="" />
        <span>{title}</span>
    </Link>
}

export default MenuOption;