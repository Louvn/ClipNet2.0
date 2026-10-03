import { useEffect, useState } from "react";
import { useAPI } from "./useAPI";
import { useCache } from "../../context/CacheContext";

export function useStats() {
    
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    const {cacheItem, getCachedItem} = useCache();
    const apiFetch = useAPI();

    useEffect(() => {

        const cached = getCachedItem("stats", "general");
        if (cached) {
            setLoading(false);
            return setStats(cached);
        }

        apiFetch(
            "/stats/general", 
            { method: "GET" }
        )
            .then(res => res.json())
            .then(data => {
                setStats(data);
                cacheItem("stats", "general", data);
            })

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch]);

    return {stats, loading, error};
}