import { useParams } from "react-router-dom";
import styles from "./styles.module.css";
import { useArticle } from "../../hooks/useArticle";

function ArticleEditor() {

    const slug = useParams();
    const {article, loading} = useArticle(slug);

    return <div className="medium">

        

    </div>
}

export default ArticleEditor;