import type { ButtonParams } from '@/components/Buttons/Buttons.types';
import type * as MetalsTypes from '@/features/metals/metals.types';
import type * as CtxTypes from '@contexts/metals-context.types';
import type { Dispatch, SetStateAction, MutableRefObject } from 'react';

export type MetalsProps = {
	metals: MetalsTypes.Metals;
	printRef?: MutableRefObject<HTMLDivElement> | null;
	pageContent: CtxTypes.MetalPageContent;
	metalPrices: MetalsTypes.StoredMetalPrices;
	actionButtons: ButtonParams[];
	inputValues: CtxTypes.InputValues;
	setInputValues: Dispatch<SetStateAction<CtxTypes.InputValues>>;
	dropDownOptions: (inputValues: CtxTypes.InputValues) => CtxTypes.DropDown;
	setStoredValues: Dispatch<SetStateAction<CtxTypes.StoredMetalValues>>;
	currentMetalPrices: (metals: MetalsTypes.APIMetals) => void;
	hasPrices?: boolean;
	hasInputs?: boolean;
	storedValues: CtxTypes.StoredMetalValues[];
	handleDelete: (id: string) => void;
	clearResult?: () => void;
	calculateResult?: () => void;
	setSpread: (spread: number) => void;
	spread: number;
}

export interface MetalsPropsInterface {
	metalsProps: MetalsProps;
}

export interface FetchPricesButtonProps {
	metalsProps: MetalsProps;
	className?: string;
	label?: string;
}
