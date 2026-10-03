import { Link, useParams } from "react-router-dom";
import Medium from "../../components/Medium";
import { useRevisions } from "../../hooks/api/useRevisions";
import styles from "./styles.module.css";
import Loader from "../../components/Loader";
import React from "react";

function ArticleHistory() {

    const {slug} = useParams();
    const {revisions, loading} = useRevisions(slug);

    if (loading) return <Medium>
        <Loader />
    </Medium>;


    if (revisions) return <Medium>

        {
            revisions.map((rev, idx, array) => (
                <React.Fragment key={rev.id}>
                    { new Date(array[idx-1]?.created_at).toDateString() !== new Date(rev.created_at).toDateString() && <h3>{rev.created_at}</h3> }
                    <Link to={`/wiki/${slug}/rev/${rev.id}`}>#{rev.id}: {rev.change_summary} [by @{rev.user.username}]</Link>
                </React.Fragment>
                )
            )
        }
    </Medium>
}

export default ArticleHistory;