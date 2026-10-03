import { useEffect, useState } from "react";
import { useAPI } from "./useAPI";

export function useRevision(id) {
    
    const [loading, setLoading] = useState(true);
    const [revision, setRevision] = useState(null);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        if (!id) return;

        apiFetch(
            `/get-revision?${new URLSearchParams({ id: id })}`
        )
            .then(res => {
                setStatus(res.status);
                return res.json();
            })
            .then(data => setRevision(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch, id]);

    return {revision, setRevision, loading, error, status};
}