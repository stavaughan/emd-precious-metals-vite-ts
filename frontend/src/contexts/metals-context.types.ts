import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { ButtonParams } from "@/components/Buttons/Buttons.types";
import type {
	APIMetals,
	MetalItem,
	MetalName,
	Metals,
	QualityID,
	QualityLabel,
	StoredMetalPrices,
	Weight,
} from "@/features/metals/metals.types";
import type { FileObject } from '@/components/Upload/components/upload.types';

// Metals Types
export type MetalType = string;
export type QualityDisplay = string;
export type CurrencyAmount = string;
export type Amount = number;
export type Spread = number;

export interface Metal {
	metal?: MetalType;
	quality?: string;
	weight?: Weight;
}

export interface InputValues {
	metal?: MetalName;
	quality?: string;
	qualityLabel?: QualityLabel;
	qualityDisplay?: QualityDisplay;
	weight?: Weight;
	weightLabel?: string;
	wsF?: number;
}

export type MetalQuality = {
	_id: QualityID;
	label: QualityLabel;
	display: QualityDisplay;
	alloy: number;
}

export interface MetalValues {
	metalPrice: number;
	metal: MetalType;
	weight: Weight;
	qualityID: QualityID;
}

export type StoredContentTuple = [
	MetalName,
	QualityID,
	Weight,
	CurrencyAmount
];

export interface StoredMetalValueItem extends MetalItem {
	result?: Amount;
	content?: StoredContentTuple
}

export type StoredMetalValues = StoredMetalValueItem[];

export type MappedPrices<T> = {
	[K in keyof T]: number;
}

export type HeadTuple = [string, string, string, string, ''];
export type ColTuple = ['', '', '', string, string, string];
export type FooterTuple = ['', '', '',  JSX.Element,  JSX.Element, ''];

export type MetalPageContent = {
	head: HeadTuple;
	colClasses: ColTuple;
	footer: FooterTuple;
}

type DDOption = {
	_id?: string;
	label?: string;
}

export type DropDown = {
	metal: DDOption[] | [];
	quality: DDOption[] | [];
}

export type MetalsContextType = {
	metals: Metals | [];
	printRef: MutableRefObject<HTMLDivElement> | null;
	pageContent: MetalPageContent;
	metalPrices: StoredMetalPrices;
	actionButtons: ButtonParams[] | [];
	inputValues: InputValues | null;
	setInputValues: Dispatch<SetStateAction<InputValues>>;
	dropDownOptions: (values: InputValues) => DropDown | null;
	//setStoredValues: Dispatch<SetStateAction<StoredMetalValues>>;
	setStoredValues: React.Dispatch<React.SetStateAction<FileObject[] | []>>;
	currentMetalPrices: (metals: APIMetals) => void;
	hasPrices: boolean | false;
	hasInputs: boolean | false;
	//storedValues?: StoredMetalValues | [];
	storedValues?: FileObject[] | [];
	handleDelete: (id: string) => void;
	clearResult?: () => void;
	calculateResult?: () => void;
	setSpread: Dispatch<SetStateAction<Spread>>;
	spread: Spread | 0;
};
