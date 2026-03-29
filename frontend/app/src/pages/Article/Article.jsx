import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import apiFetch from "../../utils/ApiFetch";
import styles from "./styles.module.css";

import ActionButton from "../../components/ActionButton";
import Detail from "../../components/Detail";
import Loader from "../../components/Loader";

import likeIcon from "../../assets/icons/like.png";
import reportIcon from "../../assets/icons/report.png";
import shareIcon from "../../assets/icons/share.png";
import editIcon from "../../assets/icons/edit.png";
import revisionsIcon from "../../assets/icons/revisions.png";
import permissionsIcon from "../../assets/icons/permissions.png";

import createdIcon from "../../assets/icons/created.png"
import revisionIcon from "../../assets/icons/revision.png";
import updatedIcon from "../../assets/icons/updated.png";


function Article() {
    const { slug } = useParams();
    const [articleData, setArticleData] = useState({});

    // state to control rendering preventing rendering non-existing keys
    const [gotValidData, setGotValidData] = useState(false);

    const navigate = useNavigate();

    // get article data on slug change
    useEffect(() => {

        apiFetch(
            `/get-article?${new URLSearchParams({slug: slug})}`,
            {
                method: "GET"
            }
        )
        // 404 redirect
        .then(res => res.ok ? res : navigate("/404", { replace: true }))

        .then(response => response.json())
        .then(data => {

            setArticleData(data);
            setGotValidData(true);
        })

        .catch(error => {
            console.error(error);
        })

    }, [navigate, slug]);



    // Loading Animation
    if (!gotValidData) return <div className="medium">
        <Loader />
    </div>;


    // Article Page 
    if (gotValidData) return <div className={`medium ${styles.ArticlePageRoot}`}>

        <div className={styles.Sidebar}>

            <section className={styles.SidebarSection}>
                <h2>Details</h2>

                <Detail text={`revision #${articleData.current_revision.id}`} icon={revisionIcon} />
                <Detail text="created 4 days ago by Louvn" icon={createdIcon} />
                <Detail text="updated 1 hour ago by Louvn" icon={updatedIcon} />
            </section>

            <section className={`${styles.SidebarSection} ${styles.Actions}`}>
                <h2>Actions</h2>

                <ActionButton text="2" icon={likeIcon}/>
                <ActionButton text="share" icon={shareIcon} />
                <ActionButton text="report" icon={reportIcon} />

                <hr />

                <ActionButton text="edit" icon={editIcon} />
                <ActionButton text="revisions" icon={revisionsIcon} />
                <ActionButton text="permissions" icon={permissionsIcon} />

            </section>

        </div>

        <main className={styles.ArticleMain}>
            <h1 className={styles.ArticleMainTitle}>{articleData.current_revision.title}</h1>
            <hr />
            <div className={styles.ArticleMainContent}>{articleData.current_revision.content}</div>
        </main>

        <div className={styles.CommentSection}>
            <h2>
                Comment
                <button className={styles.AddCommentButton}>Add Comment</button>
            </h2>
            <hr />

            <div className={styles.Comments}>
                <em>There are no comments</em>
            </div>

        </div>

    </div>
}

export default Article;