import styles from "./styles.module.css"
import searchImg from "../../assets/icons/search.png";
import deleteSearchImg from "../../assets/icons/delete-query.png";
import { useState } from "react";

function Searchbar({onChange, onBlur, onFocus}) {

    const [query, setQuery] = useState("");

    const handleChange = (e) => {

        setQuery(e.target.value);

        onChange(e);
    }

    return <div className={styles.Searchbar}>

        <button className={styles.SearchbarButton}>
            <img src={searchImg} alt="search" className={styles.SearchbarButtonImg} />
        </button>

        <input 
            type="text" 
            placeholder="Search" 
            className={styles.SearchbarInput}
            value={query}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            />

        {query.trim() && 
        <button className={styles.SearchbarButton} onClick={() => setQuery("")}>
            <img src={deleteSearchImg} alt="cancel search" className={styles.SearchbarButtonImg} />
        </button>
        }

    </div>
}

export default Searchbar;