import styles from "./styles.module.css";
import placeholderIcon from "../../assets/logo-white.png";
import Medium from "../../components/Medium";
import ContentList from "../../components/ContentList";
import { useUser } from "../../hooks/useUser";
import { Navigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useTranslation } from "react-i18next";

function UserProfile() {

    const {t} = useTranslation();
    const {id} = useParams();
    const {user, loading, status} = useUser(id);

    if (status === 404) return <Navigate to="/404" />;

    if (loading) return <Medium>
        <Loader />
    </Medium>;

    if (!loading) return <Medium className={styles.UserProfileRoot}>
        <div className={styles.UserInfoCard}>
            <img src={placeholderIcon} alt="" className={styles.ProfilePicture} />
            <div className={styles.UserInfo}>
                <h1>{user.username}</h1>
                <i>User since {user.created_at}*</i>
                <hr />
                <p>{user.bio}</p>
            </div>
        </div>

        <div className={styles.Grid}>
            <ContentList
                query=""
                title={t("user.totalArticles", {count: user.total_articles})}
                filters={{ content_type: ["article"], op_id: user.id }}
                sort_by="last_updated_first" 
                showFullContent
                />
            <ContentList
                query=""
                title={t("user.totalArticlesContributed", {count: user.total_articles_contributed_to})}
                filters={{ content_type: ["article"], contributor_id: user.id }}
                sort_by="last_updated_first" 
                showFullContent
                />
        </div>
    </Medium>
}

export default UserProfile;