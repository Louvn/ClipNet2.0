import Medium from "../../components/Medium/Medium";
import { useNavigate, useParams } from "react-router-dom";
import { useArticle } from "../../hooks/useArticle";
import Loader from "../../components/Loader";
import { useUserIndex } from "../../context/UserIndexContext";
import { useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { notificationTypeSuccess, useToastNotification } from "../../context/ToastNotificationContext";

function PermissionEditor() {

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

        const data = await res.json();

        if (!res.ok) return toastNotification(typeof data.detail === "string" ? data.detail : "Error while saving Changes");

        toastNotification("Changes Saved", notificationTypeSuccess);
        navigate(`/wiki/${slug}`);

    }


    if (loading || !userIndex) return <Loader />

    return <Medium>
        
        <select value={article.edit_permission} onChange={e => setArticle({ ...article, edit_permission: Number(e.target.value) })}>
            <option value={1}>everyone</option>
            <option value={2}>contributors</option>
        </select>

        <ul>
            {
                article.contributors.map(
                    id => <li key={id}>
                        {getContributor(id)}
                        <button onClick={() => removeContributor(id)}>x</button>
                    </li>
                )
            }
        </ul>

        <input value={inputContributor} onChange={e => setInputContributor(e.target.value)} />
        <button onClick={() => addContributor(inputContributor)}>+</button>

        <button onClick={saveChanges}>save</button>

    </Medium>
}

export default PermissionEditor;