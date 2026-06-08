import styles from "./styles.module.css"

function Footer() {
    return <footer className={styles.Footer}>

        <section>
            <h2>[Development]</h2>

            <a href={`${process.env.REACT_APP_API_URL}/docs`}>API Docs</a>
        </section>


    </footer>
}

export default Footer;