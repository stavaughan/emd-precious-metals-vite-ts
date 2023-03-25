import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { ButtonParams } from "@/components/Buttons/Buttons.types";
import type {
	APIMetals,
	MetalData,
	MetalName,
	Metals,
	QualityID,
	StoredMetalPrices,
	Weight,
} from "@/features/metals/metals.types";
import type { ResultsItem } from '@/components/Tables/ResultsTable/Results.types';

// Metals Types
export type MetalType = string;
export type QualityDisplay = string;
export type CurrencyAmount = string;
export type Amount = number;
export type Spread = number;

export interface Metal {
	metal?: string;
	quality?: string;
	weight?: number;
}

export interface InputValues {
	metal?: string;
	quality?: string;
	qualityLabel?: string;
	qualityDisplay?: string;
	weight?: number;
	weightLabel?: string;
	wsF?: number;
}

export type MetalQuality = {
	_id: string;
	label: string;
	display: string;
	alloy: number;
}

export interface MetalValues {
	metalPrice: number;
	metal: string;
	weight: number;
	qualityID: string;
}

export type StoredContentTuple = [
	MetalName,
	QualityID,
	Weight,
	CurrencyAmount
] | string[] | [];

export type MetalResultsItem =  ResultsItem<MetalData>;

export interface StoredMetalValueItem extends MetalResultsItem {
	result?: Amount;
}

export type StoredMetalValues = StoredMetalValueItem[] | [];

export type SetStoredValues = Dispatch<SetStateAction<StoredMetalValues>>;

export type MappedPrices<T> = {
	[K in keyof T]: number;
}

export type HeadTuple = string[] | [];
export type ColTuple = string[] | [];
export type FooterTuple = string[] | JSX.Element[] | [];

export type MetalPageContent = {
	head: HeadTuple;
	colClasses: ColTuple;
	footer: FooterTuple;
}

export type Update = {
	price: boolean;
	spread: boolean;
}

export type SetUpdate = Dispatch<SetStateAction<Update>>;

type DDOption = {
	_id?: string;
	label?: string;
}

export type DropDown = {
	metal: DDOption[] | [];
	quality: DDOption[] | [];
}

export type MetalsContextType = {
	metals: Metals;
	printRef: MutableRefObject<HTMLDivElement>;
	pageContent: MetalPageContent;
	metalPrices: StoredMetalPrices;
	actionButtons: ButtonParams[] | [];
	inputValues: InputValues | null;
	setInputValues: Dispatch<SetStateAction<InputValues>>;
	dropDownOptions: (values: InputValues) => DropDown | null;
	setStoredValues: SetStoredValues;
	currentMetalPrices: (metals: APIMetals) => void;
	hasPrices: boolean | false;
	hasInputs: boolean | false;
	storedValues?: StoredMetalValues;
	handleDelete: (id: string) => void;
	clearResult?: () => void;
	calculateResult?: () => void;
	setSpread: Dispatch<SetStateAction<Spread>>;
	setUpdate: SetUpdate;
	spread: Spread | 0;
};
