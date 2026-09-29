import { Link } from "react-router-dom";
import styles from "./styles.module.css"
import { useTranslation } from "react-i18next";

function Footer() {

    const {t} = useTranslation();

    return <footer className={styles.Footer}>

        <section>
            <h2>[ClipNet {process.env.REACT_APP_WIKI_VERSION}]</h2>
            <span>© 2025-2026 Louvn</span>
            <Link to="/wiki/about">{t("footer.about")}</Link>
            <a href={`${process.env.REACT_APP_API_URL}/docs`}>API</a>
            <Link to="/images">{t("image.title_other")}</Link>
        </section>

        <section>
            <h2>[{t("footer.community")}]</h2>
            <Link to="/wiki/rules">{t("footer.rules")}</Link>
        </section>

    </footer>
}

export default Footer;