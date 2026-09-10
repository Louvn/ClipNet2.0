import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useArticle } from "../../hooks/useArticle";
import { useEffect, useState } from "react";
import WikiTextEditor from "../../components/WikiTextEditor";
import { useAPI } from "../../hooks/useAPI";
import Medium from "../../components/Medium";
import Loader from "../../components/Loader";
import PopUp from "../../components/PopUp";
import SimpleButton from "../../components/SimpleButton";
import { useToastNotification, notificationTypeSuccess } from "../../context/ToastNotificationContext";
import { useTranslation } from "react-i18next";
import LimitedInput from "../../components/LimitedInput";

function ArticleEditor() {

    const {t} = useTranslation();
    const [params] = useSearchParams();

    const apiFetch = useAPI();
    const toastNotification  = useToastNotification();

    const navigate = useNavigate();
    const {slug} = useParams();
    const {article, loading, status} = useArticle(slug);
    const isEdit = !!slug;

    const [useExistingDraft, setUseExistingDraft] = useState(null);
    const [isDraftPopUpOpen, setDraftPopUpOpen] = useState(false);

    // states changed by the Editor
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");
    const [changeSummary, setChangeSummary] = useState("");
    const [isPopUpOpen, setPopUpOpen] = useState(false);
    const [isPublishing, setPublishing] = useState(false);

    // set them after loading complete (in case of creating new they will be: "")
    useEffect(() => {

        const draft = JSON.parse(localStorage.getItem(`draft${article?.id || ""}`));

        if ((!loading || !slug) && !params.get("title") && draft?.content) {
            
            if (useExistingDraft === null) setDraftPopUpOpen(true);
            
            if (useExistingDraft) {
                setTitle(draft.title);
                setContent(draft.content);
                return;
            }
        }

        setContent(article?.current_revision?.content || "");
        setTitle(article?.current_revision?.title || (params.get("title") || ""));
        
    }, [article, loading, params, useExistingDraft, slug]);



    // auto saving draft
    useEffect(() => {
        if (content?.length > 0 && article?.current_revision.content !== content) {
            localStorage.setItem(`draft${article ? article.id : ""}`, JSON.stringify({ title: title, content: content}));
        }
    }, [title, content, article]);
    
    // redirect after publishing changes
    const afterPublish = () => {
        toastNotification(t("toast.articlePublished"), notificationTypeSuccess);
        navigate(isEdit ? `/wiki/${slug}` : "/");
        
        localStorage.removeItem(`draft${article.id || ""}`);
    }

    // async function used in createArticle and editArticle
    const reactToError = async (fallbackNotification, res) => {

        setPublishing(false);
        setPopUpOpen(false);
    }

    const createArticle = () => {

        setPublishing(true);

        const data = {
            title: title,
            content: content
        }

        apiFetch("/create-article", {method: "POST", body: JSON.stringify(data)})
            .then(res => {
                if (res.ok) {
                    afterPublish();
                } else {
                    reactToError(t("toast.articleCouldNotBePublished"), res);
                }
            })
    }

    const editArticle = () => {

        setPublishing(true);

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
                } else {
                    reactToError(t("toast.changesCouldNotBePublished"), res);
                }
            })
    }

    // pick correct method
    const publish = () => {

        if (title.length < 1 || content.length < 1) return toastNotification(t("toast.missingTitleOrContent"));

        const publishingFunc = (isEdit ? editArticle : createArticle)
        publishingFunc();
    };



    // loading animation if editing existing article
    if (loading && isEdit) return <Medium> 
        <Loader />
    </Medium>;

    // loading animation while publishing
    if (isPublishing) return <Medium> 
        <Loader />
        <h2 className={styles.PublishingArticle}>{t("article.publishing")}</h2>
    </Medium>;

    // not found
    if (status === 404) return <Navigate to="/404" />;


    // view after loading
    return <Medium className={styles.EditorPageRoot}>
        
        <div className={styles.TopBar}>

            <SimpleButton 
                onClick={() => navigate(-1)}  // navigate 1 back
                className={styles.TopBarButton}
                >
                ← {t("common.back")}
            </SimpleButton>

            <span className={styles.Counters}>{t("article.counter", {chars: content.length, words: content ? content.split(" ").length : 0})}</span>

            <SimpleButton onClick={() => setPopUpOpen(true)} className={styles.TopBarButton}>
                {t("article.publish")}
            </SimpleButton>

        </div>


        <WikiTextEditor 
            // standard WikiTextEditor
            content={content} 
            title={title}
            setContent={setContent}
            setTitle={setTitle}
            />


        {isPopUpOpen && <PopUp className={styles.PublishPopUp} closingMethod={() => setPopUpOpen(false)}>
            <h2 className={styles.PopUpHeading}>{t("article.publishChanges")}</h2>

            <LimitedInput
                name={t("article.changeSummary")}
                placeholder={t("placeholder.changeSummary")}
                maxLength={255}
                value={isEdit ? changeSummary : "Created This Article"}
                setValue={setChangeSummary}
                disabled={!isEdit} // no change_summary on first revision
                />

            <SimpleButton onClick={publish} className={styles.PublishPopUpButton}>{t("article.publish")}</SimpleButton>
        </PopUp>}

        {isDraftPopUpOpen && <PopUp closingMethod={() => setDraftPopUpOpen(false)} className={styles.DraftPopUp}>
            <h2 className={styles.PopUpHeading}>{t("draft.draftFound")}</h2>
            <p>{t("draft.info")}</p>

            <div className={styles.DraftPopUpButtons}>
                <SimpleButton onClick={() => {setUseExistingDraft(true); setDraftPopUpOpen(false)}} className={styles.DraftPopUpButton}>{t("draft.use")}</SimpleButton>
                <SimpleButton onClick={() => setDraftPopUpOpen(false)} className={styles.DraftPopUpButtonRed}>{t("draft.overwrite")}</SimpleButton>
            </div>
        </PopUp>}

    </Medium>
}

export default ArticleEditor;