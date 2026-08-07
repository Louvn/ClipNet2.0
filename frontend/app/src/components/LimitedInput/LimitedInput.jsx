import styles from "./styles.module.css";

function LimitedInput({ name, maxLength, placeholder, value, setValue, disabled, className }) {

    return <fieldset className={`${styles.LimitedInput} ${className ? className : ""}`}>
        <legend>{name} - {value.length}/{maxLength}</legend>
    
        <textarea 
            placeholder={placeholder} 
            maxLength={maxLength}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            disabled={disabled}
            />
    
    </fieldset>
}

export default LimitedInput;