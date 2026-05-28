// This file contains a context used to cache all article titles connected with their slugs

import { createContext, useContext, useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { useAuth } from "./AuthContext";

const WikiIndexContext = createContext();

export function WikiIndexContextProvider({ children }) {

    const [wikiIndex, setWikiIndex] = useState(new Map());
    const apiFetch = useAPI();
    const { isLoggedIn } = useAuth();

    useEffect(() => {

        async function loadIndex() {
            // async function inside of sync effect
            // fetching while effect is already done
            // not required when using .then()

            if (!isLoggedIn) return;

            const res = await apiFetch("/wiki-index", { method: "GET" });
            const index = await res.json();

            if (res.status) return;

            const indexMap = new Map(); // Map is faster than array

            index.forEach((a) => {
                indexMap.set(a.title, a);
            })

            setWikiIndex(indexMap);
        }

        loadIndex();
    }, [apiFetch, isLoggedIn]);

    return <WikiIndexContext.Provider value={wikiIndex}>{children}</WikiIndexContext.Provider>;
}

export function useWikiIndex() {
    return useContext(WikiIndexContext);
}