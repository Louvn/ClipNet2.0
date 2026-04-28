import menuImg from "../../assets/icons/menu.png"
import styles from "./styles.module.css"
import {useState} from "react"
import DarkOverlay from "../DarkOverlay";

function Menu() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return <>
        <button className={styles.MenuButton} onClick={() => setMenuOpen(true)}>
            <img src={menuImg} alt="Menu" className={styles.MenuButtonImg}/>
        </button>

        <menu className={`${styles.Menu} ${isMenuOpen ? styles.Open : ""}`}>
            <button onClick={() => 
                {
                    localStorage.removeItem("jwt");
                    window.dispatchEvent(new CustomEvent("jwtChange", localStorage.getItem("jwt")));
                }}
            >Logout</button>
        </menu>

        {isMenuOpen && <DarkOverlay onClick={() => setMenuOpen(false)} />}
    </>
}

export default Menu;