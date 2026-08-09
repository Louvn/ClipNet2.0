import styles from "./styles.module.css"
import searchImg from "../../assets/icons/search.png";
import deleteSearchImg from "../../assets/icons/delete-query.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Searchbar({onChange, onBlur, onFocus}) {

    const {t} = useTranslation();
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {

        setQuery(e.target.value);

        onChange(e);
    }

    return <div className={styles.Searchbar}>

        <button className={styles.SearchbarButton}>
            <img src={searchImg} alt="search" className={`${styles.SearchbarButtonImg} noInvert`} />
        </button>

        <input 
            type="text" 
            placeholder={t("search.search")} 
            className={styles.SearchbarInput}
            value={query}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            onKeyDown={(e) => e.key === "Enter" && navigate("/search", { state: { query: query } })}
            />

        {query.trim() && 
        <button className={styles.SearchbarButton} onClick={() => setQuery("")}>
            <img src={deleteSearchImg} alt="cancel search" className={`${styles.SearchbarButtonImg} noInvert`} />
        </button>
        }

    </div>
}

export default Searchbar;