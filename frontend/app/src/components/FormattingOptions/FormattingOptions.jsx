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
import { useTranslation } from "react-i18next";

function FormattingOptions({ inputRef, textState, changeTextState }) {

    const {t} = useTranslation();

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
                <img src={undoIcon} alt={t("common.undo")} />
            </button>
    
            <button className={styles.FormattingOption}>
                <img src={redoIcon} alt={t("common.redo")} />
            </button>
        </section>
    
        <section>
            <button className={styles.FormattingOption} onClick={() => insertFormat("#", "#")}>
                <img src={headingIcon} alt={t("editor.heading")} />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("##", "##")}>
                <img src={subheadingIcon} alt={t("editor.subheading")} />
            </button>
        </section>
    
        <section>
            <button className={styles.FormattingOption} onClick={() => insertFormat("**", "**")}>
                <img src={boldIcon} alt={t("editor.bold")} />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("*", "*")}>
                <img src={italicIcon} alt={t("editor.italic")} />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("[[", "]]")}>
                <img src={linkIcon} alt={t("editor.link")} />
            </button>
    
            <button className={styles.FormattingOption} onClick={() => insertFormat("[[@", "]]")}>
                <img src={mentionIcon} alt={t("editor.mention")} />
            </button>
        </section>
    
        <section>
            <button className={styles.FormattingOption}>
                <img src={tableIcon} alt={t("editor.table")} />
            </button>
    
            <button className={styles.FormattingOption}>
                <img src={imageIcon} alt={t("editor.image")} />
            </button>
        </section>
    
    </div>


}

export default FormattingOptions;