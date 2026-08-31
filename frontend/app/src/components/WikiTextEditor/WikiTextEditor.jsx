import styles from "./styles.module.css";
import articleStyles from "../../pages/Article/styles.module.css";
import FormattingOptions from "../FormattingOptions";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import wikitextToJsx from "../../wikitext-engine";

function WikiTextEditor({title, content, setContent, setTitle}) {
    
    const {t} = useTranslation();
    const textareaRef = useRef(null);
    const [isPreview, setPreview] = useState(false);

    return <main className={styles.Editor}>

        <input 
            type="text" 
            placeholder={t("placeholder.articleTitle")}
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            className={styles.EditorTitle}
            disabled={isPreview}
            />

        <FormattingOptions 
            inputRef={textareaRef}
            textState={content}
            changeTextState={setContent}
            previewButton={() => setPreview(!isPreview)}
            />

        {!isPreview && <textarea 
            placeholder={t("placeholder.articleContent")}
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className={styles.EditorContent}
            ref={textareaRef}
            />}

        {isPreview && <div className={`${styles.Preview} ${articleStyles.ArticleMainContent}`}>{wikitextToJsx(content)}</div>}

    </main>

}

export default WikiTextEditor;