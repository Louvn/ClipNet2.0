import { createContext, useContext, useState } from "react";

const CacheContext = createContext();

export function CacheContextProvider({ children }) {

    const [cache, setCache] = useState({});

    const cacheItem = (type, key, data) => {
        setCache(
            prev => (
                {...prev, [`${type}:${key}`]: {data: data, cachedAt: Date.now()}}
            )
        );
    }

    const getCachedItem = (type, key) => {
        const item = cache[`${type}:${key}`];

        if (!item) return null;
        if (Date.now() - item.cachedAt > 5 * 60 * 1000) return null;

        return item.data;
    }

    const clearCache = (type) => {

        setCache(prev => (
            Object.fromEntries(
                Object.entries(prev).filter(([key]) => !key.startsWith(`${type}:`))
            )
        ))
    }

    return <CacheContext.Provider value={{cacheItem, getCachedItem, clearCache}}>{children}</CacheContext.Provider>
}

export function useCache() {
    return useContext(CacheContext);
}