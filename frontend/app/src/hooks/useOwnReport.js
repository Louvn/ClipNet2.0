import { useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";

export function useOwnReport(article_id) {
    
    const [loading, setLoading] = useState(true);
    const [report, setReport] = useState(null);
    const [error, setError] = useState(null);

    const apiFetch = useAPI();

    useEffect(() => {

        apiFetch(
            `/get-own-report?${new URLSearchParams({article_id: article_id})}`,
            { method: "GET" }
        )
            .then(res => res.json())
            .then(data => setReport(data))

            .catch(setError)

            .finally(() => setLoading(false))

    }, [apiFetch, article_id]);

    return {report, setReport, loading, error};
}