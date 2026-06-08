import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);
    const isLoggedIn = !!jwt;

    useEffect(() => {
        if (jwt) {
            localStorage.setItem("jwt", jwt);
        } else {
            localStorage.removeItem("jwt");
        }

        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [jwt, user]);

    return <AuthContext.Provider value={{ jwt, setJwt, isLoggedIn, setUser, user }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}