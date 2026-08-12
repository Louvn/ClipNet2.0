import { Navigate, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useArticle } from "../../hooks/useArticle";

import ActionButton from "../../components/ActionButton";
import Detail from "../../components/Detail";
import Loader from "../../components/Loader";

import wikitextToJsx from "../../wikitext-engine";

import editIcon from "../../assets/icons/edit.png";
import revisionsIcon from "../../assets/icons/revisions.png";
import permissionsIcon from "../../assets/icons/permissions.png";

import createdIcon from "../../assets/icons/created.png"
import revisionIcon from "../../assets/icons/revision.png";
import updatedIcon from "../../assets/icons/updated.png";
import Medium from "../../components/Medium";
import SimpleButton from "../../components/SimpleButton";
import { useAuth } from "../../context/AuthContext";
import LikeButton from "../../components/LikeButton";
import ShareButton from "../../components/ShareButton";
import FormattingOptions from "../../components/FormattingOptions";
import { useRef, useState } from "react";
import { useAPI } from "../../hooks/useAPI";
import { notificationTypeSuccess, useToastNotification } from "../../context/ToastNotificationContext";
import { useComments } from "../../hooks/useComments";
import Comment from "../../components/Comment";
import { useTranslation } from "react-i18next";
import { formatTimestamp } from "../../utils/formatTimestamp";
import ReportButton from "../../components/ReportButton";


function Article() {

    const { slug } = useParams();
    const {t} = useTranslation();

    const {article, loading, status} = useArticle(slug);
    const {comments, commentsLoading, reloadComments} = useComments(article?.id);
    const apiFetch = useAPI();
    const {user} = useAuth();
    const navigate = useNavigate();

    // comments-related
    const commentInputRef = useRef(null);
    const [commentInput, setCommentInput] = useState("");
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [postingComment, setPostingComment] = useState(false);
    const toastNotification = useToastNotification();

    const postComment = () => {
        if (!commentInput || !commentInput.trim()) return;
        setPostingComment(true);

        apiFetch("/create-comment", {
            method: "POST",
            body: JSON.stringify({
                article_id: article.id,
                content: commentInput
            })
        })
            .then(res => {
                if (res.ok) {
                    toastNotification(t("toast.commentPosted"), notificationTypeSuccess)
                    reloadComments();

                } else {
                    toastNotification(t("toast.commentCouldNotBePosted"));
                }

                setPostingComment(false);
                setCommentInput("");
            })
    }


    // Loading Animation
    if (loading) return <Medium>
        <Loader />
    </Medium>;

    if (status === 404) return <Navigate to="/404" />;


    // Article Page 
    if (article) return <Medium className={styles.ArticlePageRoot}>

        <aside className={styles.Sidebar}>

            <section className={styles.SidebarSection}>
                <h2>{t("common.details")}</h2>

                <Detail text={t("article.revisionCounter", {count: article.revision_count})} icon={revisionIcon} />
                <Detail 
                    text={t("article.createdByUser", {user: article.op.username, time: formatTimestamp(article.first_revision.created_at, t)})} 
                    icon={createdIcon} 
                    link={`/community/user/${article.op.id}`}
                    />
                <Detail 
                    text={t("article.lastEditedByUser", {user: article.current_revision.user.username, time: formatTimestamp(article.current_revision.created_at, t)})} 
                    icon={updatedIcon} 
                    link={`/community/user/${article.current_revision.user.id}`}
                    />
            </section>

            <section className={`${styles.SidebarSection} ${styles.Actions}`}>
                <h2>{t("common.actions")}</h2>

                <LikeButton article={article} />
                <ShareButton title={article.current_revision.title} />
                <ReportButton article={article} />

                <hr />

                {
                    (article.edit_permission === 1 || article.op.id === user.id || article.contributors.includes(user.id))
                    && <ActionButton icon={editIcon} onClick={() => navigate(`/editor/${slug}`)}>{t("actions.edit")}</ActionButton>
                }
                <ActionButton icon={revisionsIcon}>{t("article.revisions")}</ActionButton>
                {   article.op.id === user.id
                    && <ActionButton icon={permissionsIcon} onClick={() => navigate(`/perm-editor/${slug}`)}>{t("permissions.title")}</ActionButton>
                }

            </section>

        </aside>

        <main className={styles.ArticleMain}>
            <h1 className={styles.ArticleMainTitle}>{article.current_revision.title}</h1>
            <hr />
            <div className={styles.ArticleMainContent}>{wikitextToJsx(article.current_revision.content)}</div>
        </main>

        <div className={styles.CommentSection}>
            <h2>
                {t("comments.title")}
                <SimpleButton onClick={() => setShowCommentInput(!showCommentInput)}>{showCommentInput ? t("actions.close") : t("comments.add")}</SimpleButton>
            </h2>
            <hr />

            {showCommentInput && <div className={styles.CommentEditor}>
                <FormattingOptions 
                    inputRef={commentInputRef}
                    textState={commentInput}
                    changeTextState={setCommentInput}
                    />
                
                <input type="text" ref={commentInputRef} value={commentInput} onChange={(e) => setCommentInput(e.currentTarget.value)} placeholder={t("placeholder.comment")} />
                <SimpleButton onClick={postComment} disabled={postingComment} className={styles.PostButton}>{t("comments.post")}</SimpleButton>
            </div>}

            <div className={styles.Comments}>

                {!commentsLoading && comments?.length > 0 && comments?.map(e => <Comment data={e} key={e.created_at} />)}

                {commentsLoading && <Loader />}

                {!commentsLoading && comments?.length === 0 && <em>{t("comments.noComments")}</em>}
            </div>

        </div>

    </Medium>
}

export default Article;