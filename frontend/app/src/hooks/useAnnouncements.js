import { useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";

export function useAnnouncements() {
    
    const [loading, setLoading] = useState(true);
    const [announcements, setAnnouncements] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        apiFetch(
            "/get-announcements", 
            { method: "GET" }
        )
            .then(res => res.json())
            .then(data => setAnnouncements(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch]);

    return {announcements, setAnnouncements, loading, error};
}