import styles from "./styles.module.css";
import FormattingOptions from "../FormattingOptions";
import { useRef } from "react";

function WikiTextEditor({title, content, setContent, setTitle}) {
    
    const textareaRef = useRef(null);

    return <main className={styles.Editor}>

        <input 
            type="text" 
            placeholder="Give your Article a Title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className={styles.EditorTitle}
            />

        <FormattingOptions 
            inputRef={textareaRef}
            textState={content}
            changeTextState={setContent}
            />

        <textarea 
            placeholder="Type in the story you want to tell ..." 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className={styles.EditorContent}
            ref={textareaRef}
            />

    </main>

}

export default WikiTextEditor;