import menuImg from "../../assets/icons/menu.png"
import styles from "./styles.module.css"
import {useState} from "react"
import DarkOverlay from "../DarkOverlay";
import { useAuth } from "../../context/AuthContext";
import ThemeButton from "../ThemeButton";
import { useTranslation } from "react-i18next";
import MenuOption from "../MenuOption";
import homeIcon from "../../assets/icons/home.png"
import randomIcon from "../../assets/icons/random.png";
import createIcon from "../../assets/icons/create.png";
import userIcon from "../../assets/icons/user.png";
import settingsIcon from "../../assets/icons/settings.png";
import logoutIcon from "../../assets/icons/logout.png";
import { useWikiIndex } from "../../context/WikiIndexContext";
import { useNavigate } from "react-router-dom";

function Menu() {

    const {t} = useTranslation();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { setJwt, user } = useAuth();
    const wikiIndex = useWikiIndex();
    const navigate = useNavigate();

    const randomArticle = () => {
        const articles = Array.from(wikiIndex.values());
        const a = articles[Math.floor(Math.random() * articles.length)];

        navigate(`/wiki/${a.slug}`);
    }

    return <>

        <button className={styles.MenuButton} onClick={() => setMenuOpen(true)}>
            <img src={menuImg} alt="Menu" className={`${styles.MenuButtonImg} noInvert`}/>
        </button>

        <menu className={`${styles.Menu} ${isMenuOpen ? styles.Open : ""}`}>

            <section>
                <MenuOption
                    title={t("nav.home")}
                    link={"/"}
                    icon={homeIcon}
                />
                {wikiIndex.size !== 0 && <MenuOption
                    title={t("nav.random")}
                    onClick={randomArticle}
                    icon={randomIcon}
                />}
                <MenuOption
                    title={t("nav.create")}
                    link={"/editor"}
                    icon={createIcon}
                />
            </section>

            <section>
                <MenuOption
                    title={user ? user?.username : "???"}
                    link={`/community/user/${user?.id}`}
                    icon={userIcon}
                />
                <MenuOption
                    title={t("nav.settings")}
                    link={"/settings"}
                    icon={settingsIcon}
                />
                <MenuOption
                    title={t("auth.logout")}
                    onClick={() => setJwt(null)}
                    icon={logoutIcon}
                />
            </section>

            <ThemeButton className={styles.Theme} />
        </menu>

        {isMenuOpen && <DarkOverlay onClick={() => setMenuOpen(false)} />}
    </>
}

export default Menu;