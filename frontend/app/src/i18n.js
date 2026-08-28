import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./locales/de.json";
import en from "./locales/en.json";
import pl from "./locales/pl.json";
import es from "./locales/es.json";
import fr from "./locales/fr.json";
import nl from "./locales/nl.json";
import zhCN from "./locales/zh-CN.json";

i18n
    .use(initReactI18next)
    .init({
        resources: {
            de: {
                translation: de
            },
            en: {
                translation: en
            },
            pl: {
                translation: pl
            },
            es: {
                translation: es
            },
            fr: {
                translation: fr
            },
            nl: {
                translation: nl
            },
            "zh-CN": {
                translation: zhCN
            }

        },
        lng: "en",
        fallbackLng: "en",
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;