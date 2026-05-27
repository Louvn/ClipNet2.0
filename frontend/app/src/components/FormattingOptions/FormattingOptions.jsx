import styles from "./styles.module.css";

import headingIcon from "../../assets/icons/format_heading.png";
import subheadingIcon from "../../assets/icons/format_subheading.png";
import undoIcon from "../../assets/icons/undo.png";
import redoIcon from "../../assets/icons/redo.png";
import boldIcon from "../../assets/icons/format_bold.png";
import italicIcon from "../../assets/icons/format_italic.png";
import linkIcon from "../../assets/icons/format_link.png";
import mentionIcon from "../../assets/icons/format_mention.png";
import tableIcon from "../../assets/icons/format_table.png";
import imageIcon from "../../assets/icons/format_image.png";

function FormattingOptions({ inputRef, textState, changeTextState }) {

    function insertFormat(opening, closing) {

        const inputField = inputRef.current;

        const selecStart = inputField.selectionStart;
        const selecEnd = inputField.selectionEnd;

        const selection = textState.slice(selecStart, selecEnd);

        const updatedText = 
            textState.slice(0, selecStart) +
            opening + 
            selection +
            closing +
            textState.slice(selecEnd);

        changeTextState(updatedText);

        // Why timeout? Because React needs time to update controlled input
        setTimeout(() => {
            inputField.focus();

            inputField.selectionStart = selecStart + opening.length;
            inputField.selectionEnd = selecEnd + opening.length;
        }, 0); // will be executed after the current running code is done
    }

    return <div className={styles.Formatting}>
                
        <section>
            <button className={styles.FormattingOption}>
                <img src={undoIcon} alt="undo" />
            </button>
    
            <button className={styles.FormattingOption}>
                <img src={redoIcon} alt="redo" />
            </button>
        </section>
    
        <section>
            <button className={styles.FormattingOption} onClick={() => insertFormat("#", "#")}>
                <img src={headingIcon} alt="insert Heading" />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("##", "##")}>
                <img src={subheadingIcon} alt="insert Subheading" />
            </button>
        </section>
    
        <section>
            <button className={styles.FormattingOption} onClick={() => insertFormat("**", "**")}>
                <img src={boldIcon} alt="insert Bold" />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("*", "*")}>
                <img src={italicIcon} alt="insert Italic" />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("[[", "]]")}>
                <img src={linkIcon} alt="insert Link" />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("[[@", "]]")}>
                <img src={mentionIcon} alt="insert Mention" />
            </button>
        </section>
    
        <section>
            <button className={styles.FormattingOption}>
                <img src={tableIcon} alt="insert Table" />
            </button>
    
            <button className={styles.FormattingOption}>
                <img src={imageIcon} alt="insert Image" />
            </button>
        </section>
    
    </div>


}

export default FormattingOptions;