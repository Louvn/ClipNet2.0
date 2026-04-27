import { Navigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useArticle } from "../../hooks/useArticle";
import { useEffect, useState } from "react";
import WikiTextEditor from "../../components/WikiTextEditor";
import apiFetch from "../../utils/ApiFetch";
import Loader from "../../components/Loader";

function ArticleEditor() {

    const {slug} = useParams();
    const isEdit = !!slug;
    const {article, loading, status} = useArticle(slug);

    // states changed by the Editor
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [changeSummary, setChangeSummary] = useState("");

    // set them after loading complete (in case of creating new they will be: "")
    useEffect(() => {

        setContent(article?.current_revision?.content || "");
        setTitle(article?.current_revision?.title || "");
        
    }, [article]);

    
    const createArticle = () => {

        const data = {
            title: title,
            content: content
        }

        apiFetch("/create-article", {method: "POST", body: JSON.stringify(data)})
            .then(res => {
                if (res.ok) {
                    alert("Published!")
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
                    alert("Published!")
                }
            })
    }

    // pick correct method
    const publish = (isEdit ? editArticle : createArticle);



    // loading animation if editing existing article
    if (loading && isEdit) return <div className="medium"> 
        <Loader />
    </div>;

    // not found
    if (status === 404) return <Navigate to="/404" />;


    // view after loading
    return <div className="medium">
        
        <button onClick={publish}>Publish</button>

        <WikiTextEditor 
            // standard WikiTextEditor
            initialContent={content} 
            initialTitle={title}
            onContentChange={(e) => setContent(e.target.value)}
            onTitleChange={(e) => setTitle(e.target.value)}
            />

        <input 
            type="text" 
            placeholder="Explain your changes" 
            maxLength={255} 
            onChange={(e) => setChangeSummary(e.target.value)}
            disabled={!isEdit} // no change_summary on first revision
            />

    </div>
}

export default ArticleEditor;