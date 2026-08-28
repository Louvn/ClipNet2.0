import ActionButton from "../ActionButton";
import styles from "./styles.module.css";
import reportIcon from "../../assets/icons/report.png";
import deleteIcon from "../../assets/icons/delete.png";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import PopUp from "../PopUp/PopUp";
import LimitedInput from "../LimitedInput";
import SimpleButton from "../SimpleButton";
import Loader from "../Loader";
import { useAPI } from "../../hooks/useAPI";
import { useOwnReport } from "../../hooks/useOwnReport";
import { notificationTypeSuccess, useToastNotification } from "../../context/ToastNotificationContext";
import { formatTimestamp } from "../../utils/formatTimestamp";
import { useAuth } from "../../context/AuthContext";

function ReportButton({ article }) {

    const {report, loading, setReport} = useOwnReport(article.id); // existing report
    const [posting, setPosting] = useState(false);

    const {t} = useTranslation();
    const [popUpOpen, setPopUpOpen] = useState(false);
    const [reason, setReason] = useState("");
    const apiFetch = useAPI();
    const toastNotification = useToastNotification();
    const {user} = useAuth();
    const isOp = (user.id === article.op.id);

    const postReport = async () => {

        setPosting(true);

        const res = await apiFetch(
            "/report-article", 
            {method: "POST", body: JSON.stringify({
                article_id: article.id,
                reason: reason
            })}
        );

        if (!res.ok) return;

        const data = await res.json();
        setReport(data); // updated ownReport
        setPosting(false);

        toastNotification(t(isOp ? "toast.deletionProposed" : "toast.reportedArticle"), notificationTypeSuccess);
    }

    return <>
        <ActionButton
            icon={isOp ? deleteIcon : reportIcon}
            onClick={() => setPopUpOpen(true)}
        >{t(isOp ? "report.delete.title" : "report.title")}</ActionButton>

        {popUpOpen && <PopUp closingMethod={() => setPopUpOpen(false)} className={styles.ReportPopUp}>
            
            {!loading && !posting && !report && <>
            <h2 className={styles.ReportPopUpHeading}>{t(isOp ? "report.delete.proposeDeletion" : "report.reportArticle")}</h2>
            {isOp && <i className={styles.ExistingReportCreated}>{t("report.delete.explanation")}</i>}

            <LimitedInput
                name={t("report.reason")}
                placeholder={t("placeholder.reportArticleReason")}
                maxLength={255}
                value={reason}
                setValue={setReason}
                />

            <SimpleButton onClick={postReport} className={styles.ReportPopUpButton}>{t(isOp ? "report.delete.title" : "report.title")}</SimpleButton>
            </>}

            {(loading || posting) && <Loader divHidden />}

            {!loading && !posting && report && <>
            <h2 className={styles.ReportPopUpHeading}>{t(isOp ? "report.delete.proposedDeletion" : "report.reportedArticle")}</h2>
            <i className={styles.ExistingReportCreated}>{formatTimestamp(report.created_at, t)}</i>

            <fieldset className={styles.ExistingReportReason}>
                <legend>{t("report.reason")}</legend>
                {report.reason}
            </fieldset>
            
            <span>
                <strong>{t("report.status")}: </strong>
                {report.pending ? t("report.pending") : t(isOp ? "report.delete.denied" : "report.noViolationFound")}
            </span>

            </>}

        </PopUp>}
    </>
}

export default ReportButton;