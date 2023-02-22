import { StatusState } from '../features.types';

export enum METALS_ACTION_TYPES {
	FETCH_METALS_PENDING = 'metal/FETCH_METALS_PENDING',
	FETCH_METALS_FULFILLED = 'metal/FETCH_METALS_FULFILLED',
	FETCH_METALS_REJECTED = 'metal/FETCH_METALS_REJECTED',
}

export enum METALPRICES_ACTION_TYPES {
	FETCH_METALPRICES_PENDING = 'metal/FETCH_METALPRICES_PENDING',
	FETCH_METALPRICES_FULFILLED = 'metal/FETCH_METALPRICES_FULFILLED',
	FETCH_METALPRICES_REJECTED = 'metal/FETCH_METALPRICES_REJECTED',
}

// Metals Types
export type MetalName = 'gold' | 'silver' | 'platinum';
export type QualityLabel = string;
export type QualityID = string;
export type Weight = number;

export type File = {
	name?: string;
	size?: number;
	type?: string;
};

export type Image = {
	file?: File;
	isImage: boolean;
	name: string;
	url: string;
};

export interface MetalItem {
	_id?: string;
	image?: Image;
	metal?: MetalName;
	quality?: QualityLabel;
	qualityID?: QualityID;
	metalID?: MetalName;
	weight?: Weight;
}

export type MetalsMap = {
	[key: string]: MetalItem[];
};

export interface MetalPrices {
	gold?: number;
	silver?: number;
	platinum?: number;
}

export type Metals = string[] | [];

export interface StoredMetalPrices extends MetalPrices {
	date?: string;
}

export type MetalPricesMap = {
	[key: string]: MetalPrices;
};

export interface APIMetals {
	XAG?: number; // 0.035 silver 1 ounce = USD / XAG
	XAU?: number; // 0.0005 gold 1 ounce = USD / XAU
	XPT?: number; // 0.0001 platinum 1 ounce = USD / XPT
}

export interface MetalsRepsonseRates extends APIMetals {
	USD?: number; // 1
}

export type MetalsResponseError = {
	code?: number; // 101
	info?: string; // "No API Key was specified or an invalid API Key was specified."
};

export interface MetalsResponseData {
	base?: string; // "USD"
	date?: string; // "2021-05-18"
	rates?: MetalsRepsonseRates | null;
	success?: boolean; // true
	error?: MetalsResponseError;
	timestamp?: number; // 1621337600
	unit?: string; // "per ounce"
	message?: string;
}

export interface MetalsData {
	metals?: MetalItem[];
}

export interface SelMetals {
	selSymbols?: string;
}

// Metals Response Data fetched from Metals API
export interface MetalPricesData {
	metalsRes: MetalsResponseData | {};
}

export interface MetalsReducerState extends StatusState, MetalsData, MetalPricesData {}
