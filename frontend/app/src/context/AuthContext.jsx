import { createContext, useCallback, useContext, useEffect, useState } from "react";
import i18n from "../i18n";
import { notificationTypeSuccess, useToastNotification } from "./ToastNotificationContext";
import { useTranslation } from "react-i18next";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {

    const [jwt, setJwt] = useState(localStorage.getItem("jwt"));
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(false); // for all sites to wait until user is there
    const isLoggedIn = !!jwt;
    const toastNotification = useToastNotification();
    const {t} = useTranslation();

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

        return data;
    }, [jwt])


    useEffect(() => {

        const handle = async () => {
            if (jwt) {
                localStorage.setItem("jwt", jwt);
            } else {
                localStorage.removeItem("jwt");
            }

            if (!jwt) return;

            const user = await reloadUser(); // load user from jwt
            // welcome message on new login (username doesn't exist in the case of a banned user)
            if (user.username) toastNotification(t("toast.welcomeBack", {user: user.username}), notificationTypeSuccess);
        }

        handle();

    }, [jwt, reloadUser, toastNotification]); // t not as dependency to avoid infinite loop


    return <AuthContext.Provider value={{ jwt, setJwt, isLoggedIn, user, reloadUser, userLoading, setUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext);
}