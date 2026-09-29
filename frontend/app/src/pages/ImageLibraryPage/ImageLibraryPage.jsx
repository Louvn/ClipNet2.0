import { useNavigate } from "react-router-dom";
import ImageLibrary from "../../components/ImageLibrary";
import Medium from "../../components/Medium";
import styles from "./styles.module.css";

function ImageLibraryPage() {

    const navigate = useNavigate();

    return <Medium>
        <ImageLibrary 
            className={styles.ImageLibrary}
            onClose={() => navigate("/")}
            />
    </Medium>
}

export default ImageLibraryPage;