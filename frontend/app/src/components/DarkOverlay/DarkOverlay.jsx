import styles from "./styles.module.css"

function DarkOverlay({ onclick }) {
    return <div className={styles.Overlay} onClick={onclick}></div>
}

export default DarkOverlay;