import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCallback } from "react";

export function useAPI() {
    // hooks are sync
    // this one gives a async function back

    const { jwt, setJwt } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

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

            if (response.status === 401) {
                setJwt(null);
            }


            return response;
        } catch (error) {
            navigate("/network-error", { state: { from: location.pathname, initialState: location.state } });

            throw error;
        }
    }, [jwt, setJwt, location, navigate])

    return apiFetch;
}