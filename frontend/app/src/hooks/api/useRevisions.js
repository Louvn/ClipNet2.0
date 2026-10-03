import { useEffect, useState } from "react";
import { useAPI } from "./useAPI";

export function useRevisions(slug) {
    
    const [loading, setLoading] = useState(true);
    const [revisions, setRevisions] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        if (!slug) return;

        apiFetch(
            `/get-article-revisions?${new URLSearchParams({ slug: slug })}`
        )
            .then(res => res.json())
            .then(data => setRevisions(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch, slug]);

    return {revisions, setRevisions, loading, error};
}