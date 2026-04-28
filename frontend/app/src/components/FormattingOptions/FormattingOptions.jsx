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



function FormattingOptions() {
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
            <button className={styles.FormattingOption}>
                <img src={headingIcon} alt="insert Heading" />
            </button>
    
            <button className={styles.FormattingOption}>
                <img src={subheadingIcon} alt="insert Subheading" />
            </button>
        </section>
    
        <section>
            <button className={styles.FormattingOption}>
                <img src={boldIcon} alt="insert Bold" />
            </button>
    
            <button className={styles.FormattingOption}>
                <img src={italicIcon} alt="insert Italic" />
            </button>
    
            <button className={styles.FormattingOption}>
                <img src={linkIcon} alt="insert Link" />
            </button>
    
            <button className={styles.FormattingOption}>
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