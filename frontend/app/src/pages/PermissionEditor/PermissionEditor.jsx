import Medium from "../../components/Medium/Medium";
import { useNavigate, useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticle";
import Loader from "../../components/Loader";
import { useUserIndex } from "../../context/UserIndexContext";
import { useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { notificationTypeSuccess, useToastNotification } from "../../context/ToastNotificationContext";
import { useTranslation } from "react-i18next";
import styles from "./styles.module.css";
import Select from "../../components/Select";
import SimpleButton from "../../components/SimpleButton";

function PermissionEditor() {

    const {t} = useTranslation();
    const {slug} = useParams();
    const {article, setArticle, loading} = useArticle(slug);
    const apiFetch = useAPI();
    const toastNotification = useToastNotification();
    const navigate = useNavigate();

    const userIndex = useUserIndex();
    const [inputContributor, setInputContributor] = useState("");

    const addContributor = (username) => {
        const user = userIndex.get(username);

        if (!user) return;
        if (article.contributors.includes(user.id)) return;

        setArticle(
            {
                ...article, 
                contributors: [...article.contributors, user.id]
            }
        )
    }

    const removeContributor = (id) => {
        setArticle(
            { 
                ...article, 
                contributors: article.contributors.filter(e => e !== id)
            }
        )
    }

    const getContributor = (id) => {
        return Array.from(userIndex.values())
            .filter(e => e.id === id)?.[0]?.username;
    }

    const saveChanges = async () => {

        const res = await apiFetch("/edit-permissions", { method: "PUT", body: JSON.stringify({
            id: article.id,
            contributors: article.contributors,
            edit_permission: article.edit_permission
        })});

        if (!res.ok) return toastNotification(t("toast.errorWhileSavingChanges"));

        toastNotification(t("toast.changesSaved"), notificationTypeSuccess);
        navigate(`/wiki/${slug}`);

    }


    if (loading || !userIndex) return <Medium><Loader /></Medium>;

    return <Medium className={styles.PermissionEditorRoot}><div className={styles.PermissionEditor}>
        
        <div>
            <h1>{t("permissions.title")}</h1>
            <i>{article.current_revision.title} / {t("permissions.title")}</i>
        </div>

        <label>
            {t("permissions.label")}
            <Select value={article.edit_permission} onChange={e => setArticle({ ...article, edit_permission: Number(e.target.value) })}>
                <option value={1}>{t("permissions.everyone")}</option>
                <option value={2}>{t("permissions.selectedOnly")}</option>
            </Select>
        </label>

        {article.edit_permission === 2 && <>
        <label>
            {t("permissions.selectedUsers")}:
            <ul className={styles.UsersUl}>
                {
                    article.contributors.map(
                        id => <li key={id} className={styles.UserLi}>
                            {getContributor(id)}
                            <button onClick={() => removeContributor(id)}>X</button>
                        </li>
                    )
                }
            </ul>
        </label>

        <div className={styles.AddUser}>
            <input 
                value={inputContributor} 
                onChange={e => setInputContributor(e.target.value)} 
                onKeyDown={(e) => e.key === "Enter" && addContributor(inputContributor)}
                />
            <SimpleButton onClick={() => addContributor(inputContributor)} className={styles.AddButton}>{t("common.add")}</SimpleButton>
        </div>
        </>}

        <SimpleButton onClick={saveChanges} className={styles.Save}>{t("actions.saveChanges")}</SimpleButton>

    </div></Medium>
}

export default PermissionEditor;