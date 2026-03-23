import {Link} from "react-router-dom";
import styles from "./styles.module.css";
import logoImg from "../../assets/logo-white.png";
import Menu from "../Menu";
import Streak from "../Streak";
import InstantSearch from "../InstantSearch";

function Navbar() {
    return <nav className={styles.Navbar}>
        <Link to="/" className={styles.Logo}>
            <img src={logoImg} alt="" className={styles.LogoImg} />
            <h1 className={styles.LogoText}>ClipNet</h1>
        </Link>

        <InstantSearch />

        <div className={styles.RightCorner}>
            <Streak />
            <Menu />
        </div>
    </nav>
}

export default Navbar;