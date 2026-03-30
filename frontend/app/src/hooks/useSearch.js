import { useEffect, useState } from "react"
import apiFetch from "../utils/ApiFetch";

export function useSearch(query) {

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        
        if (!query) return;

        setLoading(true);

        const body = {query: query};

        apiFetch(
            "/search",
            { method: "POST", body: JSON.stringify(body) }
        )
            .then(res => res.json())
            .then(data => setResults(data))

            .catch(setError)

            .finally(() => setLoading(false))


    }, [query]);

    return {results, loading, error};
}