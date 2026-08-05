import { useEffect, useState } from "react"

function ThemeButton() {

    const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true" || false);

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("darkMode", darkMode)
    }, [darkMode]);

    return <button onClick={() => setDarkMode(!darkMode)}>
        switch to {darkMode ? "light" : "dark"} mode*
    </button>
}

export default ThemeButton;