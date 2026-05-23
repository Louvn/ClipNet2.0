// This file contains a context used to cache all article titles connected with their slugs

import { createContext, useContext, useEffect, useState } from "react";
import apiFetch from "../utils/ApiFetch";

const WikiIndexContext = createContext();

export function WikiIndexContextProvider({ children }) {

    const [wikiIndex, setWikiIndex] = useState([]);

    useEffect(() => {

        async function loadIndex() {
            // async function inside of sync effect
            // fetching while effect is already done
            // not required when using .then()

            const res = await apiFetch("/wiki-index", { method: "GET" });
            const index = await res.json();

            const indexMap = new Map(); // Map is faster than array

            index.forEach((a) => {
                indexMap.set(a.title, a);
            })

            setWikiIndex(indexMap);
        }

        loadIndex();
    }, []) // TODO: Make dependency: Login

    return <WikiIndexContext.Provider value={wikiIndex}>{children}</WikiIndexContext.Provider>;
}

export function useWikiIndex() {
    return useContext(WikiIndexContext);
}