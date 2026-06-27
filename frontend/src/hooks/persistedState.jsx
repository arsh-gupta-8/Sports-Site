import { getItem, setItem } from "../utils/localStorage";
import { useEffect, useState } from "react";

export function updateState(key, initVal) {
    const [val, setVal] = useState(() => {
        const item = getItem(key);
        return item || initVal;
    })

    useEffect(() => {
        setItem(key, val)
    }, [val])

    return [val, setVal]
}