import { useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";

export function useSettings() {
    
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        apiFetch(
            "/get-settings", 
            { method: "GET" }
        )
            .then(res => res.json())
            .then(data => setSettings(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch]);

    return {settings, setSettings, loading, error};
}