import styles from "./styles.module.css";
import FormattingOptions from "../FormattingOptions";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

function WikiTextEditor({title, content, setContent, setTitle}) {
    
    const {t} = useTranslation();
    const textareaRef = useRef(null);

    return <main className={styles.Editor}>

        <input 
            type="text" 
            placeholder={t("placeholder.articleTitle")}
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            maxLength="50"
            className={styles.EditorTitle}
            />

        <FormattingOptions 
            inputRef={textareaRef}
            textState={content}
            changeTextState={setContent}
            />

        <textarea 
            placeholder={t("placeholder.articleContent")}
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className={styles.EditorContent}
            ref={textareaRef}
            />

    </main>

}

export default WikiTextEditor;