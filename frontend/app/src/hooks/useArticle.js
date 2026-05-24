import { useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";

export function useArticle(slug) {

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        if (!slug) return;

        setLoading(true);
        
        apiFetch(
            `/get-article?${new URLSearchParams({slug: slug})}`
        )   
            .then(res => {
                setStatus(res.status);
                return res.json();
            })
            .then(data => setArticle(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [slug, apiFetch]);

    return {article, loading, error, status};
}