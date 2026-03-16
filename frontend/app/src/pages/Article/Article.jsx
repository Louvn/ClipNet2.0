import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import apiFetch from "../../utils/ApiFetch";

function Article() {
    const { slug } = useParams();
    const [articleData, setArticleData] = useState({});

    useEffect(() => {
        apiFetch(
            `/get-article?${new URLSearchParams({slug: slug})}`,
            {
                method: "GET"
            }
        )
        .then(response => response.json())
        .then(data => {
            setArticleData(data)
        })
    }, [slug]);

    return <>{articleData.current_revision.name}: {articleData.current_revision.content}</>
}

export default Article;