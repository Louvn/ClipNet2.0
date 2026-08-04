import { useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";

export function useUser(user_id) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        if (!user_id) return;

        setLoading(true);
        
        apiFetch(
            `/get-user?${new URLSearchParams({user_id: user_id})}`
        )   
            .then(res => {
                setStatus(res.status);
                return res.json();
            })
            .then(data => setUser(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [user_id, apiFetch]);

    return {user, setUser, loading, error, status};
}