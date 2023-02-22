import { Dispatch, SetStateAction } from "react";

export type FetchStatus = 'IDLE' | 'PROCESSING' | 'ERROR' | 'SUCCESS';
export type StorageType = "local" | "session";

export type DebounceProps = {
	fn: () => void
	waitTime: number
	deps: unknown[]
}

export type Slice = {
	isLoading?: boolean
	isError?: boolean
	message: string
	isSuccess?: boolean
}

export type ScreenWidth = {
	xsmall?: boolean;
	small?: boolean;
	medium?: boolean;
	large?: boolean;
	xlarge?: boolean;
	xxlarge?: boolean;
}

export type ScreenSize = {
	isXSmall: boolean;
	isSmall: boolean;
	isMedium: boolean;
	isLarge: boolean;
	isXLarge: boolean;
	screenWidth: ScreenWidth;
}

export interface WindowSize {
	width: number;
	height: number;
}

export type DefaultValue = string
	| string[]
	| number
	| number[]
	| object
	| object[]
	| boolean
	| boolean[]
	| null;

export interface IUseSetStorage {
	storageKey: string;
	typeKey: StorageType;
	defaultValue: DefaultValue;
}

export type StorageReturn<T> = [
	T,
	Dispatch<SetStateAction<T>>,
	Dispatch<SetStateAction<boolean>>
];
