import styles from "./styles.module.css";

function ToastNotification({ text, show, type }) {

    return <div className={`${styles.ToastNotification} ${show ? styles.Show : ""} ${type === "success" ? styles.Success : ""}`}>{text}</div>;
}

export default ToastNotification;