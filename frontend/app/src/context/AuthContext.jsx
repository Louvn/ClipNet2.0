import { createContext, useCallback, useContext, useEffect, useState } from "react";
import i18n from "../i18n";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false); // for all sites to wait until user is there
    const isLoggedIn = !!jwt;

    // to reload user with settings after changing them
    const reloadUser = useCallback(async () => {

        setUserLoading(true);

        const res = await fetch(
            process.env.REACT_APP_API_URL + "/me", 
            {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${jwt}`
                }
            }
        );

        const data = await res.json();
        
        // language changed?
        if (data?.language) {
            i18n.changeLanguage(data.language);
        }

        setUser(data);
        setUserLoading(false);
    }, [jwt])


    useEffect(() => {
        if (jwt) {
            localStorage.setItem("jwt", jwt);
        } else {
            localStorage.removeItem("jwt");
        }

        if (jwt) reloadUser(); // load user from jwt

    }, [jwt, reloadUser]);

    return <AuthContext.Provider value={{ jwt, setJwt, isLoggedIn, user, reloadUser, userLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}