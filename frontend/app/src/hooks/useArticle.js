import { useEffect, useState } from "react";
import apiFetch from "../utils/ApiFetch";

export function useArticle(slug) {

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

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

    }, [slug]);

    return {article, loading, error, status};
}