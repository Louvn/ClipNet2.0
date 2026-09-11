import { useEffect, useState } from "react";
import styles from "./styles.module.css";

function SplashScreen() {

    const [dots, setDots] = useState(-2); // for not starting immadiently

    useEffect(() => {

        const timer = setTimeout(
            () => {
                if (dots >= 3) {
                    setDots(0);
                } else {
                    setDots(dots+1)
                }
            },
            700
        )

        return () => clearTimeout(timer);
    }, [dots]);

    return <div className={styles.SplashScreen}>
        <h1>ClipNet{dots >= 0 && ".".repeat(dots)}</h1>
    </div>
}

export default SplashScreen;