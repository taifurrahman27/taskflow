import {
    useEffect,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";

function useLocalStorage<T>(
    key: string,
    initialValue: T
): [T, Dispatch<SetStateAction<T>>] {
    const [value, setValue] = useState<T>(() => {
        const savedValue = localStorage.getItem(key);

        if (!savedValue) {
            return initialValue;
        }

        try {
            return JSON.parse(savedValue) as T;
        } catch {
            return initialValue;
        }
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}

export default useLocalStorage;