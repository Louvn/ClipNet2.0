import { createContext, useContext, useState } from "react";
import ToastNotification from "../components/ToastNotification";

const ToastNotificationContext = createContext();

export const notificationTypeSuccess = "success";

export function ToastNotificationContextProvider({ children }) {

    const [notification, setNotification] = useState(null);
    const [notificationType, setNotificationType] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    function notify(text, type) {

        setNotification(text);
        setNotificationType(type);
        setShowNotification(true);

        setTimeout(() => setShowNotification(false), 5000);

    }

    return <ToastNotificationContext.Provider value={notify}>
        <ToastNotification text={notification} show={showNotification} type={notificationType} />
        { children }

    </ToastNotificationContext.Provider>
}

export function useToastNotification() {
    return useContext(ToastNotificationContext);
}