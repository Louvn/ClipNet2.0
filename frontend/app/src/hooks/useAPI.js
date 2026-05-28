import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";
import { useToastNotification } from "../context/ToastNotificationContext";

export function useAPI() {
    // hooks are sync
    // this one gives a async function back

    const { jwt, setJwt } = useAuth();
    const toastNotification = useToastNotification();

    const apiFetch = useCallback(async (url, options={}) => {

        const response = await fetch(
            "/api" + url, {
                headers: {
                    ...options.headers,
                    "Authorization": `Bearer ${jwt}`,
                    "Content-Type": "application/json"
                },
                ...options
            }
        );

        if (response.status === 401) {
            toastNotification("You need to login again");
            setJwt(null);
        }

        return response;
    }, [jwt, setJwt, toastNotification])

    return apiFetch;
}