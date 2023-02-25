import { useState } from "react";
import { toast } from "react-toastify";
import type { DefaultValue } from "./hooks.types";

const useLocalStorage = (key: string, initialValue: DefaultValue) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (err: any) {
			return initialValue;
		}
	});

	const setValue = (value: (arg0: unknown) => unknown): void => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (err: any) {
			toast.error('Error saving to local storage');
		}
	};

	return [storedValue, setValue];
}

export default useLocalStorage;
