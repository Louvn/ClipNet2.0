import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";
import { useToastNotification } from "../context/ToastNotificationContext";

export function useAPI() {
    // hooks are sync
    // this one gives a async function back

    const { jwt, setJwt, setUser } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const toastNotification = useToastNotification();

    const apiFetch = useCallback(async (url, options={}) => {
        try {
            const response = await fetch(
                process.env.REACT_APP_API_URL + url, {
                    headers: {
                        ...options.headers,
                        "Authorization": `Bearer ${jwt}`,
                        "Content-Type": "application/json"
                    },
                    ...options
                }
            );

            const data = await response.clone().json();
            if (response.status === 401) {
                setJwt(null); // log out
            }
            else if (response.status === 403 && data?.detail?.code === "USER_BANNED") { // TODO: Change to data.detail
                setUser(u => ({...u, is_banned: true})) // is_banned = true => Banned Page
            }
            else if (!response.ok) {
                toastNotification("Error") // TODO: Change to translation codes;
            }

            return response;
        } catch (error) {
            navigate("/network-error", { state: { from: location.pathname, initialState: location.state } });

            throw error;
        }
    }, [jwt, setJwt, location, navigate, toastNotification, setUser])

    return apiFetch;
}