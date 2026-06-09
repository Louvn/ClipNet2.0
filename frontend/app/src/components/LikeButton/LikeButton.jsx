import ActionButton from "../ActionButton";
import likeIcon from "../../assets/icons/like.png";
import styles from "./styles.module.css";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAPI } from "../../hooks/useAPI";

function LikeButton({ article }) {

    const {user} = useAuth();
    const apiFetch = useAPI()
    const [likes, setLikes] = useState(article.liked_by);

    const triggerLike = () => {

        if (!likes.includes(user.id)) {
            apiFetch(`/like/${article.id}`, { method: "POST" })
                .then(res => {
                    if (res.ok) {
                        setLikes([ ...likes, user.id ]);
                    }
                })

            return
        }

        apiFetch(`/like/${article.id}`, { method: "DELETE" })
            .then(res => {
                if (res.ok) {
                    setLikes(likes.filter(e => e !== user.id));
                }
            })
    }

    return <ActionButton 
        icon={likeIcon}
        onClick={triggerLike}
        className={likes.includes(user.id) ? styles.Liked : ""}
    >{likes.length}</ActionButton>
}

export default LikeButton;