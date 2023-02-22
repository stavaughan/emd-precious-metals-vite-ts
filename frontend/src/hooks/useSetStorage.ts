import { useState, useEffect } from "react";
import type { IUseSetStorage, StorageReturn } from "./hooks.types";

const useSetStorage = ({
	storageKey,
	typeKey,
	defaultValue,
}: IUseSetStorage): StorageReturn<string> => {

	const storage = typeKey === 'session' ? sessionStorage : localStorage;

	const [clear, setClear] = useState(false);

	const [value, setValue] = useState(() => {
		let currentValue;
		try {
			currentValue = JSON.parse(
				storage.getItem(storageKey) || String(defaultValue)
			);
		} catch (error: unknown) {
			currentValue = defaultValue;
		}

		return currentValue;
	});

	useEffect(() => {
		if (clear) {
			storage.removeItem(storageKey);
			setClear(false);
		}
	}, [clear, storageKey, storage, value]);

	useEffect(() => {
		if(value !== null)
		storage.setItem(storageKey, JSON.stringify(value));
	}, [value, storageKey, storage]);

	return [value, setValue, setClear];
};

export default useSetStorage;
