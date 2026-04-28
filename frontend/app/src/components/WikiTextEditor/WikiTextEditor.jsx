import styles from "./styles.module.css";
import FormattingOptions from "../FormattingOptions";

function WikiTextEditor({initialContent, initialTitle, onContentChange, onTitleChange}) {
    
    return <main className={styles.Editor}>

        <input 
            type="text" 
            placeholder="Give your Article a Title" 
            value={initialTitle} 
            onChange={onTitleChange}
            className={styles.EditorTitle}
            />

        <FormattingOptions />

        <textarea 
            placeholder="Type in the story you want to tell ..." 
            value={initialContent} 
            onChange={onContentChange}
            className={styles.EditorContent}
            />

    </main>

}

export default WikiTextEditor;