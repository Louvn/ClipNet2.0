import { Link } from "react-router-dom";
import styles from "./styles.module.css";
import { useTranslation } from "react-i18next";
import { useStats } from "../../hooks/useStats";
import { useEffect, useState } from "react";
import Loader from "../Loader";

function StatisticCards() {
    
    const {t} = useTranslation();
    const {stats, loading} = useStats();

    const [highlighted, setHighlighted] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setHighlighted(i => (i + 1) % 3); // i = current value of highlighted
        }, 2000);

        return () => clearInterval(interval); // clean up
    }, []);

    if (loading) return <Loader />;

    if (!loading) return <div className={styles.Stats}>

        <Link 
            className={`${styles.StatsCard} ${highlighted === 0 ? styles.Highlighted : ""}`} 
            to="/search" state={{query: "", filters: {content_type: ["article"]}}}
            >
            {t("common.thereAre")}
            <span>{stats.articles}</span>
            {t("article.title", {count: stats.users})}
        </Link>

        <Link 
            className={`${styles.StatsCard} ${highlighted === 1 ? styles.Highlighted : ""}`} 
            to="/search" state={{query: "", filters: {content_type: ["user"]}}}
            >
            {t("common.thereAre")}
            <span>{stats.users}</span> 
            {t("user.title", {count: stats.users})}
        </Link>

        <Link 
            className={`${styles.StatsCard} ${highlighted === 2 ? styles.Highlighted : ""}`}
            >
            {t("common.thereAre")}
            <span>???</span>
            ???
        </Link>
</div>
}

export default StatisticCards;