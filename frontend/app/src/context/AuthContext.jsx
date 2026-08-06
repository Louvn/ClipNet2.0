import { createContext, useContext, useEffect, useState } from "react";
import i18n from "../i18n";
import { useUser } from "../hooks/useUser";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [user, setUser] = useState(null);
    const isLoggedIn = !!jwt;

    // to reload user with settings after changing them
    const reloadUser = () => setUser(useUser(user.id));

    useEffect(() => {
        if (jwt) {
            localStorage.setItem("jwt", jwt);
        } else {
            localStorage.removeItem("jwt");
        }

        reloadUser(); // load user from jwt

    }, [jwt]);

    useEffect(() => {

        // language changed?
        if (user?.language) {
            i18n.changeLanguage(user.language)
        }

    }, [user])

    return <AuthContext.Provider value={{ jwt, setJwt, isLoggedIn, setUser, user, reloadUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}