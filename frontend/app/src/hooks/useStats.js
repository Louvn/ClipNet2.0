import { useEffect, useState } from "react";
import apiFetch from "../utils/ApiFetch";

export function useStats() {
    
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {

        apiFetch(
            "/stats/general", 
            { method: "GET" }
        )
            .then(res => res.json())
            .then(data => setStats(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, []);

    return {stats, loading, error};
}