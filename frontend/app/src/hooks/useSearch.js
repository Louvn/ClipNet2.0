import { useEffect, useState } from "react"
import apiFetch from "../utils/ApiFetch";

export function useSearch(query, filters, sort_by) {

    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        setLoading(true);

        const body = {
            query: query,
            filters: filters,
            sort_by: sort_by
        };

        apiFetch(
            "/search",
            { method: "POST", body: JSON.stringify(body) }
        )
            .then(res => res.json())
            .then(data => setResults(data))

            .catch(setError)

            .finally(() => setLoading(false))


    }, [query, filters, sort_by]);

    return {results, loading, error};
}