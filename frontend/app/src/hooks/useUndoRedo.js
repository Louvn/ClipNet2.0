import { useCallback, useRef, useState } from "react";

function useUndoRedo(initValue, delay = 500) {

    const [history, setHistory] = useState([initValue]);
    const [index, setIndex] = useState(0);
    const [tempValue, setTempValue] = useState(null); // for showing changes before they are in history
    const timeoutRef = useRef(null); // debuff


    const setValue = useCallback(newValue => {

        setTempValue(newValue);
        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            if (history[index] === newValue) return;

            setHistory(prev => [...prev.slice(0, index+1), newValue]);
            setIndex(prev => prev + 1);
            setTempValue(null);
        }, delay);

    }, [index, delay, history]);

    const undo = () => {
        clearTimeout(timeoutRef.current);
        setTempValue(null);

        if (index > 0) setIndex(index-1);
    }
    const redo = () => {
        clearTimeout(timeoutRef.current);
        setTempValue(null);

        if ((history.length-1) > index) setIndex(index+1);
    }

    return {
        value: tempValue !== null ? tempValue : history[index],
        setValue,
        undo,
        redo
    }
}

export default useUndoRedo;