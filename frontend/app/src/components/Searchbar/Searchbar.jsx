import styles from "./styles.module.css"
import searchImg from "../../assets/icons/search.png";
import Search from "./Searchbar";

function Searchbar() {
    return <div className={styles.Searchbar}>
        <input type="text" placeholder="Search ClipNet" className={styles.SearchbarInput}/>
        <button className={styles.SearchbarButton}>
            <img src={searchImg} alt="Search" className={styles.SearchbarButtonImg} />
        </button>
    </div>
}

export default Searchbar;