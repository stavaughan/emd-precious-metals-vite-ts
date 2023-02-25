import type { ButtonParams } from "@/components/Buttons/Buttons.types";
import type { APIMetals, MetalPrices, Metals } from "@/features/metals/metals.types";
import { amountUSD, Global } from "@/globals/js";
import { preciousMetals } from "@/globals/js/lib";
import { useSetStorage } from "@/hooks";
import type { IUseSetStorage, StorageReturn, StorageType } from '@/hooks/hooks.types';
import type { MutableRefObject } from "react";
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type {
	InputValues,
	MetalPageContent,
	MetalQuality,
	MetalsContextType,
	MetalType,
	MetalValues,
	Spread,
	StoredContentTuple,
	StoredMetalValues
} from "./metals-context.types";

const MetalsContext = createContext({
	metals: [],
	printRef: null,
	pageContent: null,
	metalPrices: null,
	actionButtons: [],
	dropDownOptions: null,
	currentMetalPrices: () => { null },
	storedValues: [],
	inputValues: null,
	hasPrices: false,
	hasInputs: false,
	handleDelete: () => { null },
	clearResult: () => { null },
	calculateResult: () => { null },
	setSpread: () => { null },
	spread: 0,
} as unknown as MetalsContextType);

export const MetalsProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {

	const printRef = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
	const storageType = 'local' as StorageType;

	const [spread, setSpread] = useSetStorage({
		storageKey: 'metalSpread',
		typeKey: storageType,
		defaultValue: 10
	} as IUseSetStorage) as unknown as StorageReturn<Spread>;

	// metal prices in storage. ie { gold: 2000, silver: 30, platinum: 1000, date: '2021-01-01' }
	const [storedPrices, setStoredPrices] = useSetStorage({
		storageKey: 'metalPrices',
		typeKey: storageType,
		defaultValue: {}
	} as IUseSetStorage) as unknown as StorageReturn<MetalPrices>;

	const [
		storedValues,
		setStoredValues,
		setClearValues
	] = useSetStorage({
		storageKey: 'metalValues',
		typeKey: storageType,
		defaultValue: []
	} as IUseSetStorage) as unknown as StorageReturn<StoredMetalValues>;

	const [loadingState, setLoadingState] = useState({
		loadingRemove: false,
		loadingAdd: false
	});

	const [inputValues, setInputValues] = useState<InputValues>({
		metal: 'gold',
		quality: '',
		qualityLabel: '',
		qualityDisplay: '',
		weight: 0,
		weightLabel: '',
		wsF: spread as number
	});

	const clearResult = useCallback(() => {
		setInputValues({
			metal: 'gold',
			quality: '',
			qualityLabel: '',
			qualityDisplay: '',
			weight: 0,
			weightLabel: '',
			wsF: spread as number
		})
	}, [setInputValues, spread]);

	const metalQualities = useCallback((metal: MetalType) => {
		return preciousMetals.filter(_ => _.metal === metal) as MetalQuality[];
	}, []);

	useEffect(() => {
		if (loadingState.loadingRemove) {
			setTimeout(() => {
				setLoadingState(prev => ({ ...prev, loadingRemove: false }))
				setClearValues(true)
				setStoredValues([])
			}, 1000);
		}
	}, [loadingState.loadingRemove, setStoredValues, setClearValues]);

	useEffect(() => {
		if (loadingState.loadingAdd) {
			setTimeout(() => {
				setLoadingState(prev => ({ ...prev, loadingAdd: false }))
			}, 1000);
		}
	}, [loadingState.loadingAdd]);

	const metalValue = useCallback(({
		metalPrice,
		metal,
		weight,
		qualityID
	}: MetalValues) => {

		// gold is measured by troy ounces vs English ounce
		const GRAMS_PER_TROY_OUNCE = 31.1034768;

		const qualities = metalQualities(metal);

		// percent precious metal in alloy based on quality and multiplied by 1000
		// e.g Pure gold is 24K. To get the percentage of gold in an 18K gold "alloy", you would divide 18 by 24 which comes out to 75% (0.75)
		const alloy = qualities.find(_ => _._id === qualityID)?.alloy || 0;

		const alloyDivisor = metal === 'gold' ? 24 : 1000;

		// 2.34 grams expressed as 2340 to avoid javascript floating point rounding errors
		const gramsOfMetal = weight * ( alloy / alloyDivisor );
		const ouncesOfMetal = gramsOfMetal / GRAMS_PER_TROY_OUNCE;
		const netValue = ouncesOfMetal * metalPrice * ((100 - spread) / 100);

		return netValue / 1000;
	}, [spread]);

	const calculateResult = useCallback(() => {
		const weight = inputValues?.weight ? inputValues?.weight : 0;
		const metal = inputValues?.metal || 'gold';
		const metalTitle = inputValues?.metal ? Global.upperCaseFirst(inputValues?.metal) : '';
		const metalPrice = storedPrices?.[metal as keyof typeof storedPrices] || 0;
		const qualityID = inputValues?.quality || '';
		const qualityDisplay = inputValues?.qualityDisplay || '';
		const displayWeight = Global.formatNumber(weight / 1000);
		const result = metalValue({
			metalPrice,
			metal,
			weight,
			qualityID
		});
		const formAmount = amountUSD({ num: result, dec: 2 });
		const dataID = Global.objectIDsGenerator(1)[0];
		const content = [
			metalTitle,
			qualityDisplay,
			displayWeight,
			formAmount
		] as StoredContentTuple

		// TODO: add update feature when user re-fetches prices
		// TODO: add date to stored values as well as metal price the create useEffect that evaluates metal price against stored prices and updates stored values if they are different
		setStoredValues((prev) => [
			...prev,
			{
				_id: dataID,
				image: null,
				metal: metalTitle,
				quality: qualityDisplay,
				qualityID,
				metalID: metal,
				amount: formAmount,
				result,
				weight: weight / 1000,
				content
			}
		] as StoredMetalValues);
		clearResult()
	}, [inputValues, metalValue, clearResult, setStoredValues, storedPrices]);

	const pageContent = useMemo(() => {
		const metalIDs = storedValues.map(_ => _.metalID) as string[];
		const qualityIDs = storedValues.map(_ => _.qualityID) as string[];
		const sameMetalIDs = metalIDs.every(_ => _ === metalIDs[0]);
		const sameQualityIDs = qualityIDs.every(_ => _ === qualityIDs[0]);
		const sameMetalAndQuality = sameMetalIDs && sameQualityIDs;
		const totalWeight = Global.propTotal(storedValues, 'weight') as number;
		const displayWeight = Global.formatNumber(totalWeight);
		const resuleValue = Global.propTotal(storedValues, 'result') as number;
		const displayValue = amountUSD({ num: resuleValue, dec: 2 }) as string;

		// TODO: Refactor to break down weight totals by metal and quality
		const jsxWeight = sameMetalAndQuality ? <span className="fw-bolder text-dark">{displayWeight}</span> as JSX.Element : <span className="fw-bolder text-dark">N/A</span> as JSX.Element;
		const jsxValue = <span className="fw-bolder text-dark">{displayValue}</span> as JSX.Element;
		return {
			head: [
				'Metal',
				'Quality',
				'Weight (grams)',
				'Value',
				''
			],
			colClasses: [
				'',
				'',
				'',
				'text-end',
				'text-end',
				'text-end'
			],
			footer: [
				'',
				'',
				'',
				jsxWeight,
				jsxValue,
				''
			]
		} as MetalPageContent;
	}, [storedValues]);

	const dropDownOptions = useCallback((values: InputValues) => ({
		metal: ['gold', 'silver', 'platinum'].map(_ => ({
			_id: _,
			label: Global.upperCaseFirst(_)
		})),
		quality: metalQualities(values?.metal as MetalType)
	}), []);

	// update metal prices from API
	const currentMetalPrices = useCallback((metals: APIMetals): void => {
		const newDate = new Date();
		const updatedPrices = {
			gold: metals?.XAU ? 1 / metals.XAU : undefined,
			silver: metals?.XAG ? 1 / metals.XAG : undefined,
			platinum: metals?.XPT ? 1 / metals.XPT : undefined,
			date: newDate.toUTCString() as string
		} as MetalPrices;
		setStoredPrices(updatedPrices);
	}, [setStoredPrices]);

	const hasPrices = useMemo(() => {
		return [!!storedPrices?.gold, !!storedPrices?.silver, !!storedPrices?.platinum].includes(true);
	}, [storedPrices?.gold, storedPrices?.silver, storedPrices?.platinum]);

	const hasInputs = useMemo(() => {
		return !!inputValues?.metal && !!inputValues?.weight && !!inputValues?.quality;
	}, [inputValues?.metal, inputValues?.weight, inputValues?.quality]);

	// Get the metal names for metals in storage. i.e. ['gold', 'silver', 'platinum']
	const metals = useMemo(() => Object.keys(storedPrices).filter(_ => _ !== 'date') as Metals, [storedPrices]);

	const onSaveToStorage = useCallback(() => {
		setLoadingState(prev => ({ ...prev, loadingAdd: true }))
	}, [setLoadingState]);

	const onRemoveFromStorage = useCallback(() => {
		setLoadingState(prev => ({ ...prev, loadingRemove: true }))
	}, [setLoadingState]);

	const actionButtons = useMemo(() => {
		return [
			{
				_id: 'uploadImage',
				type: 'modal',
				icon: 'crop-simple',
				modalID: 'imageUploadCrop',
				toolTip: `Image upload, crop and resize`
			},
			{
				_id: 'print',
				type: 'print',
				printRef,
				toolTip: 'precious metal items'
			},
			{
				_id: 'save',
				type: 'click',
				icon: 'download',
				onClick: onSaveToStorage,
				toolTip: 'Save to storage',
				loading: loadingState.loadingAdd
			},
			{
				_id: 'clear',
				type: 'click',
				icon: 'times',
				color: 'text-danger',
				onClick: onRemoveFromStorage,
				toolTip: `Clear all data`,
				loading: loadingState.loadingRemove
			}
		] as ButtonParams[];
	}, [
		printRef,
		onSaveToStorage,
		onRemoveFromStorage,
		loadingState.loadingAdd,
		loadingState.loadingRemove
	]);

	const handleDelete = useCallback((id: string): void => {
		const updateValues = (prev: StoredMetalValues) => prev.filter(item => item?._id !== id);
		setStoredValues(updateValues)
	}, [setStoredValues])

	return (
		<MetalsContext.Provider
			value={{
				metals,
				printRef,
				pageContent,
				metalPrices: storedPrices,
				actionButtons,
				inputValues,
				setInputValues,
				dropDownOptions,
				setStoredValues,
				currentMetalPrices,
				hasPrices,
				hasInputs,
				storedValues,
				handleDelete,
				clearResult,
				calculateResult,
				setSpread,
				spread
			}}
		>
			{children}
		</MetalsContext.Provider>
	);
};

export default MetalsContext;
