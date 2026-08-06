import { useNavigate } from "react-router-dom";
import LimitedInput from "../../components/LimitedInput";
import Loader from "../../components/Loader";
import Medium from "../../components/Medium";
import SimpleButton from "../../components/SimpleButton";
import { notificationTypeSuccess, useToastNotification } from "../../context/ToastNotificationContext";
import { useAPI } from "../../hooks/useAPI";
import { useSettings } from "../../hooks/useSettings";
import languages from "../../locales/_languages.json";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

function Settings() {

    const {t} = useTranslation();
    const {settings, loading, setSettings} = useSettings();
    const apiFetch = useAPI();
    const toastNotification = useToastNotification();
    const navigate = useNavigate();
    const {reloadUser} = useAuth();

    const saveSettings = () => {
        apiFetch("/change-settings", { method: "PUT", body: JSON.stringify(settings) })
            .then(res => {
                if (res.ok) {
                    toastNotification(t("toast.changesSaved"), notificationTypeSuccess);
                    reloadUser();
                    navigate("/");
                } else {
                    toastNotification(t("toast.errorWhileSavingChanges"));
                }
            })
    }

    if (loading) return <Medium>
        <Loader />
    </Medium>;


    if (!loading) return <Medium>
        <h1>{t("user.profileSettings")}</h1>

        <LimitedInput
            name={t("user.bio")}
            value={settings.bio || ""}
            setValue={(v) => setSettings({...settings, bio: v})}
            maxLength={255}
            placholder={t("placeholder.bio")}
            />

        <select value={settings.language || "en"} onChange={(e) => setSettings({...settings, language: e.target.value})}>
            {languages.map(e => <option value={e.code} key={e.code}>{e.name}</option>)}
        </select>

        <SimpleButton onClick={saveSettings}>{t("actions.saveChanges")}</SimpleButton>

    </Medium>
}

export default Settings;