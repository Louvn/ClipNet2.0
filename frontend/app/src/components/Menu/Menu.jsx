import menuImg from "../../assets/icons/menu.png"
import styles from "./styles.module.css"
import {useState} from "react"
import DarkOverlay from "../DarkOverlay";
import { useAuth } from "../../context/AuthContext";
import ThemeButton from "../ThemeButton";
import { useTranslation } from "react-i18next";

function Menu() {

    const {t} = useTranslation();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { setJwt } = useAuth();

    return <>
        <button className={styles.MenuButton} onClick={() => setMenuOpen(true)}>
            <img src={menuImg} alt="Menu" className={styles.MenuButtonImg}/>
        </button>

        <menu className={`${styles.Menu} ${isMenuOpen ? styles.Open : ""}`}>
            <button onClick={() => setJwt(null)}>{t("auth.logout")}</button>
            <ThemeButton />
        </menu>

        {isMenuOpen && <DarkOverlay onClick={() => setMenuOpen(false)} />}
    </>
}

export default Menu;