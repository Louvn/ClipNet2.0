import styles from "./styles.module.css"

function Loader({ divHidden=false }) {
    return <div className={`${styles.LoaderDiv} ${divHidden ? styles.Hidden : ""}`}>
        <div className={styles.Loader} />
    </div>
}

export default Loader;