import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import sunIcon from "../../assets/icons/sun.png";
import moonIcon from "../../assets/icons/moon.png";

function ThemeButton({ className, ...props }) {

    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" || false);

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode)
    }, [darkMode]);

    return <button className={`${styles.ThemeButton} ${className}`} onClick={() => setDarkMode(!darkMode)} {...props}>
        <img src={darkMode ? sunIcon : moonIcon} alt="" />
    </button>
}

export default ThemeButton;