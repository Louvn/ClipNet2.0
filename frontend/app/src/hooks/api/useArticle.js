import { useEffect, useState } from "react";
import { useAPI } from "./useAPI";
import { useCache } from "../../context/CacheContext";

export function useArticle(slug) {

    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const { cacheItem, getCachedItem } = useCache();
    const apiFetch = useAPI();

    useEffect(() => {

        if (!slug) return;

        // is in cache?
        const cached = getCachedItem("articles", slug);
        if (cached) {
            setLoading(false);
            return setArticle(cached);
        }


        setLoading(true);
        
        apiFetch(
            `/get-article?${new URLSearchParams({slug: slug})}`
        )   
            .then(res => {
                setStatus(res.status);
                return res.json();
            })
            .then(data => {
                setArticle(data);
                cacheItem("articles", slug, data);
            })

            .catch(setError)

            .finally(() => setLoading(false))

    }, [slug, apiFetch]);

    return {article, setArticle, loading, error, status};
}