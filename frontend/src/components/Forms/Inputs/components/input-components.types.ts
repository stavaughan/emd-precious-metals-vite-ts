import React from 'react';

import type { HiddenFileInputType } from '@/components/Gallery/ImageTransformation/image-transformation.types';

export type SupNoticeProps = {
	notice: 'required' | 'optional'
}

export type FileEventTarget = EventTarget & { files: FileList };

// When not defining the event directly
export type HandleSelectType = React.ChangeEventHandler<HTMLSelectElement>;
export type HandleChangeType = React.ChangeEventHandler<HTMLInputElement>;
export type HandleBlurType = React.FocusEventHandler<HTMLInputElement>;
export type HandleBlurSelectType = React.FocusEventHandler<HTMLSelectElement>;

// When defining the event directly
export type OnSelectType = React.ChangeEvent<HTMLSelectElement>;
export type OnChangeType = React.ChangeEvent<HTMLInputElement>;
export type OnChangeEventType = React.ChangeEvent<HTMLInputElement>;
export type OnBlurType = React.FocusEvent<HTMLInputElement, Element>;

export interface InputLabelProps {
	id?: string,
	isRequired?: boolean,
	optional?: boolean,
	label?: string,
	labelClass?: string,
	smallLabel?: boolean,
}

interface ISelectHandler {
	onChange?: (value: string) => void;
	onBlur?: HandleBlurSelectType;
}

export type IOption = {
	_id?: string;
	id?: string;
	label?: string;
	ext?: string;
};

export type DDSelectOptionsProps = {
	options?: IOption[];
	selectLabel?: string;
}

export interface DropdownSelectProps extends DDSelectOptionsProps, ISelectHandler, InputLabelProps {
	multiple?: boolean;
	selected?: string;
	flush?: boolean;
	upperCase?: boolean;
	small?: boolean;
	componentLabel?: string;
	selectClass?: string;
}



export interface InputDropdownProps extends DropdownSelectProps {
	props?: React.ReactPropTypes;
}

export interface InputWrapperProps {
	InvalidFeedBack?: React.ReactNode;
	floating?: boolean;
	groupClass?: string;
	helperMsg?: string;
	wrapStyle?: React.CSSProperties;
	errorMsg?: React.ReactNode;
	showError?: boolean;
	Icon?: React.ReactNode;
}

export interface QuantitySelectorProps {
	qty: number;
	loading: boolean;
	setData: (qty: number, dir: string) => void;
	suffix?: string;
	min?: number;
	deleteItem?: () => void;
}

export interface InputTextProps {
	id?: string;
	onChange?: (value: string) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
	errorMsg?: string;
	groupClass?: string;
	required?: boolean;
	optional?: boolean;
	label?: string;
	smallLabel?: boolean;
	helperMsg?: string;
	maxLength?: number;
	value?: string;
	disabled?: boolean;
}

export type InputWrapperLabelProps = InputWrapperProps & InputLabelProps;

export interface InputComponentProps extends InputWrapperProps, InputLabelProps {
	id?: string;
	onChange?: (value: string) => void;
	inputStyle?: React.CSSProperties;
	inputRef?: React.RefObject<HTMLInputElement>;
	onBlur?: HandleBlurType;
	onNumberChange?: HandleChangeType;
	className?: string;
	required?: boolean;
	placeholder?: string;
	flush?: boolean;
	small?: boolean;
	type?: string;
	size?: string;
	maxLength?: number;
	valueAsNumber?: number;
	value?: string;
}

export interface InputNumberTextProps {
	dec?: number;
	type?: string;
	amount?: number;
	setAmount?: React.Dispatch<React.SetStateAction<number>>;
	setEntering?: React.Dispatch<React.SetStateAction<boolean>>;
	placeholder?: string;
	required?: boolean;
	optional?: boolean;
	onBlur?: () => void;
	setMin?: (value: number) => void;
	setMax?: (value: number) => void;
	min?: number;
	max?: number;
	numericType?: string;
	label?: string;
}

export type WrapProps = {
	cols?: string;
	colClass?: string;
}

export type ColDDProps = {
	wrapProps?: WrapProps;
	selectProps?: InputDropdownProps;
}

export type ColTextProps = {
	wrapProps?: WrapProps;
	textInputProps?: InputTextProps;
}

export type ColNumTextProps = {
	wrapProps?: WrapProps;
	numTextInputProps?: InputNumberTextProps;
}


export type HiddenFileRefType = React.RefObject<HiddenFileInputType | null>;

export type EventTargetType = {
	target: FileEventTarget;
};

export type OnFileUploadType = (e: EventTargetType) => void;

export interface InputFileUploadProps {
	inputRef?: HiddenFileRefType;
	onFileUpload: HandleChangeType;
	mimeType?: string;
	multiple?: boolean;
	value?: string;
}
export interface ImageDropContainerProps extends InputFileUploadProps {
	handleClick?: () => void;
	onDropHandler?: (e: React.DragEvent<HTMLDivElement>) => void;
	inputValue?: string;
	noLabel?: boolean;
	maxSize?: string;
	style?: React.CSSProperties;
	type?: string;
}

export interface DropzoneWrapperProps extends ImageDropContainerProps {
	imageSelected?: boolean;
	children?: React.ReactNode;
}

export type InputUploadType = React.InputHTMLAttributes<HTMLInputElement>
