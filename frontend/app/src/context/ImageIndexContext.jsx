// This file contains a context used to cache all images connected with their urls

import { createContext, useContext, useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { useAuth } from "./AuthContext";

const ImageIndexContext = createContext();

export function ImageIndexContextProvider({ children }) {

    const [imageIndex, setImageIndex] = useState(new Map());
    const apiFetch = useAPI();
    const { isLoggedIn } = useAuth();

    useEffect(() => {

        async function loadIndex() {
            // async function inside of sync effect
            // fetching while effect is already done
            // not required when using .then()

            if (!isLoggedIn) return;

            const res = await apiFetch("/image-index", { method: "GET" });
            const index = await res.json();

            if (!res.ok) return;

            const indexMap = new Map(); // Map is faster than array

            index.forEach((i) => {
                indexMap.set(i.id, i);
            })

            setImageIndex(indexMap);
        }

        loadIndex();
    }, [apiFetch, isLoggedIn]);

    return <ImageIndexContext.Provider value={imageIndex}>{children}</ImageIndexContext.Provider>;
}

export function useImageIndex() {
    return useContext(ImageIndexContext);
}