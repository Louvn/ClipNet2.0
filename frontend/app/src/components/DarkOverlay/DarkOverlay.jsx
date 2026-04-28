import styles from "./styles.module.css"

function DarkOverlay({ onClick }) {
    return <div className={styles.Overlay} onClick={onClick}></div>
}

export default DarkOverlay;