import { useCallback, useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";

export function useComments(article_id) {

    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    const loadComments = useCallback(() => {
        if (!article_id) return;

        setLoading(true);
        
        apiFetch(
            `/get-comments?${new URLSearchParams({article_id: article_id})}`
        )   
            .then(res => {
                setStatus(res.status);
                return res.json();
            })
            .then(data => setComments(data))

            .catch(setError)

            .finally(() => setLoading(false))
    }, [apiFetch, setLoading, setStatus, setComments, article_id]);

    useEffect(() => {

        loadComments();

    }, [article_id, apiFetch, loadComments]);

    return {comments, reloadComments: loadComments, loading, error, status};
}