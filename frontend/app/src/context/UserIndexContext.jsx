// This file contains a context used to cache all article titles connected with their slugs

import { createContext, useContext, useEffect, useState } from "react";
import { useAPI } from "../hooks/useAPI";
import { useAuth } from "./AuthContext";

const UserIndexContext = createContext();

export function UserIndexContextProvider({ children }) {

    const [userIndex, setUserIndex] = useState(new Map());
    const apiFetch = useAPI();
    const { isLoggedIn } = useAuth();

    useEffect(() => {

        async function loadIndex() {
            // async function inside of sync effect
            // fetching while effect is already done
            // not required when using .then()

            if (!isLoggedIn) return;

            const res = await apiFetch("/user-index", { method: "GET" });
            const index = await res.json();

            if (!res.ok) return;

            const indexMap = new Map(); // Map is faster than array

            index.forEach((u) => {
                indexMap.set(u.username, u);
            })

            setUserIndex(indexMap);
        }

        loadIndex();
    }, [apiFetch, isLoggedIn]);

    return <UserIndexContext.Provider value={userIndex}>{children}</UserIndexContext.Provider>;
}

export function useUserIndex() {
    return useContext(UserIndexContext);
}