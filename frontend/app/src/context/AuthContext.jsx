import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const isLoggedIn = !!jwt;

    useEffect(() => {
        if (jwt) {
            localStorage.setItem("jwt", jwt);
        } else {
            localStorage.removeItem("jwt")
        }
    }, [jwt]);

    return <AuthContext.Provider value={{ jwt, setJwt, isLoggedIn }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}