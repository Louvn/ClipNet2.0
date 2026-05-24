import { useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";

export function useStats() {
    
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        apiFetch(
            "/stats/general", 
            { method: "GET" }
        )
            .then(res => res.json())
            .then(data => setStats(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch]);

    return {stats, loading, error};
}