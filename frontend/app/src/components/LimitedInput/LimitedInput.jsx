import { useState } from "react";
import styles from "./styles.module.css";

function LimitedInput({ name, inputName, maxLength, placeholder, value, setValue, disabled, className }) {

    const [standardValue, setStandardValue] = useState("");
    if (!value) value = standardValue;
    if (!setValue) setValue = setStandardValue;

    return <fieldset className={`${styles.LimitedInput} ${className ? className : ""}`}>
        <legend>{name} - {value.length}/{maxLength}</legend>

        <textarea 
            placeholder={placeholder} 
            maxLength={maxLength}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            name={inputName}
            />
    
    </fieldset>
}

export default LimitedInput;