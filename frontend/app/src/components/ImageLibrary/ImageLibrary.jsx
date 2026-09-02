import styles from "./styles.module.css";
import Searchbar from "../Searchbar";
import { useImageIndex } from "../../context/ImageIndexContext";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import addImageIcon from "../../assets/icons/add_image.png";
import closeIcon from "../../assets/icons/close.png";
import { useAPI } from "../../hooks/useAPI";
import { notificationTypeSuccess, useToastNotification } from "../../context/ToastNotificationContext";
import LimitedInput from "../LimitedInput";
import Loader from "../Loader";
import SimpleButton from "../SimpleButton";

function ImageLibrary({ onUseImage, onClose }) {

    const {t} = useTranslation();
    const imageIndex = useImageIndex();
    const apiFetch = useAPI();
    const toastNotification = useToastNotification();

    const [images, setImages] = useState(null);
    const [inspecting, setInspecting] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const uploadImg = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData(e.currentTarget); // currentTarget = where handler is registered, target = where it was triggered

        const res = await apiFetch("/upload-image", { method: "POST", body: formData});

        if (!res.ok) return toastNotification(t("toast.ErrorWhileUploadingFile"));

        const data = await res.json();
        imageIndex.set(data.id, data); // add to local library
        setInspecting(data);

        toastNotification(t("toast.uploadedFile"), notificationTypeSuccess);
        setUploading(false);
    }

    const search = (query) => {

        if (!query) return setImages(Array.from(imageIndex.values()));

        const results = (
            Array.from(imageIndex.values())
            .filter(img => img?.description.toLowerCase().includes(query.toLowerCase()))
        )

        setImages(results);
    }

    const fileChange = (e) => {

        const file = e.currentTarget.files[0];
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }

    useEffect(() => setImages(Array.from(imageIndex.values())), [setImages, imageIndex]);

    
    return <div className={styles.ImageLibraryRoot}>

        <div className={styles.ImageLibraryExplorer}>

            <nav className={styles.ImageLibraryNav}>
                <Searchbar 
                    className={styles.Searchbar}
                    onChange={e => search(e.target.value)}
                    />
            </nav>

            <div className={styles.Images}>
                {
                    images?.map(img => <button key={img.id} className={styles.Image} onClick={() => setInspecting(img)}>
                        <img src={img.url} alt={img.description} className="noInvert" />
                    </button>)
                }
                {images?.length === 0 && <em className={styles.NothingFound}>{t("search.nothingFound")}</em>}
            </div>

            {inspecting && <button className={styles.AddButton} onClick={() => setInspecting(null)}>
                <img src={addImageIcon} alt={t("image.upload")} className="noInvert"/>
            </button>}

        </div>

        <aside className={styles.ImageLibraryInspector}>
            <div className={styles.LibraryActions}>

                <button className={styles.LibraryAction} onClick={onClose}>
                    <img src={closeIcon} alt={t("actions.close")} />
                </button>

            </div>

            {inspecting && <>
                <div className={styles.InspectedImage}>
                    <img src={inspecting.url} alt="" className="noInvert" />
                    <em>{inspecting.description}</em>
                </div>

                <SimpleButton onClick={() => onUseImage(inspecting.id)}>{t("image.use")}</SimpleButton>
            </>}

            {!inspecting && !uploading && <form onSubmit={uploadImg} className={styles.Uploader}>
                <h2>{t("image.uploadImage")}</h2>

                <label className={styles.FileUploadLabel}>
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" required name="file" onChange={fileChange}></input>
                    
                    {selectedFile && <img src={previewUrl} alt="" className={styles.Preview} />}
                    {!selectedFile && <img src={addImageIcon} alt={t("image.upload")} className={styles.UploadIcon} />}
                </label>

                <LimitedInput
                    maxLength={255}
                    name={t("image.description")}
                    placeholder={t("placeholder.describeImage")}
                    inputName="description"
                    className={styles.DescriptionInput}
                    />

                <SimpleButton type="submit">{t("image.upload")}</SimpleButton>

            </form>}

            {uploading && <Loader divHidden />}
        </aside>
    </div>
}

export default ImageLibrary;