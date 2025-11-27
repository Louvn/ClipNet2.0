import Logo from "../../assets/logo-blue.png"
import styles from "./styles.module.css"

function Loader() {
    return <img src={Logo} alt="Loading..." className={styles.Loader} />
}

export default Loader;