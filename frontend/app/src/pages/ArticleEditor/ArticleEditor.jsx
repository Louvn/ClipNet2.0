import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useArticle } from "../../hooks/useArticle";
import { useEffect, useState } from "react";
import WikiTextEditor from "../../components/WikiTextEditor";
import apiFetch from "../../utils/ApiFetch";
import Loader from "../../components/Loader";

function ArticleEditor() {

    const navigate = useNavigate();
    const {slug} = useParams();
    const {article, loading, status} = useArticle(slug);
    const isEdit = !!slug;

    // states changed by the Editor
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [changeSummary, setChangeSummary] = useState("");

    // set them after loading complete (in case of creating new they will be: "")
    useEffect(() => {

        setContent(article?.current_revision?.content || "");
        setTitle(article?.current_revision?.title || "");
        
    }, [article]);

    
    // redirect after publishing changes
    const afterPublish = () => {
        navigate(`/wiki/${slug}`);
    }

    const createArticle = () => {

        const data = {
            title: title,
            content: content
        }

        apiFetch("/create-article", {method: "POST", body: JSON.stringify(data)})
            .then(res => {
                if (res.ok) {
                    afterPublish();
                }
            })
    }

    const editArticle = () => {

        const data = {
            article_id: article.id,
            title: title,
            content: content,
            change_summary: changeSummary
        };

        apiFetch("/edit-article", {method: "PUT", body: JSON.stringify(data)})
            .then(res => {
                if (res.ok) {
                    afterPublish();
                }
            })
    }

    // pick correct method
    const publish = (isEdit ? editArticle : createArticle);



    // loading animation if editing existing article
    if (loading && isEdit) return <Medium> 
        <Loader />
    </Medium>;

    // not found
    if (status === 404) return <Navigate to="/404" />;


    // view after loading
    return <Medium>
        
        <button onClick={publish}>Publish</button>

        <WikiTextEditor 
            // standard WikiTextEditor
            initialContent={content} 
            initialTitle={title}
            onContentChange={(e) => setContent(e.target.value)}
            onTitleChange={(e) => setTitle(e.target.value)}
            />

        <fieldset>
            <legend>Change Summary - {changeSummary.length}/255</legend>

            <input 
                type="text" 
                placeholder="Explain your changes" 
                maxLength={255} 
                onChange={(e) => setChangeSummary(e.target.value)}
                disabled={!isEdit} // no change_summary on first revision
                />

        </fieldset>

    </Medium>
}

export default ArticleEditor;