import React from 'react';
import { DropdownSelect, InputNumberText, InputText } from './components';
import type {
	ColDDProps,
	ColTextProps,
	ColNumTextProps
} from './components/input-components.types';
import { ColWrap } from '.';

const InputCol = {
	Dropdown: ({
		wrapProps,
		selectProps
	}: ColDDProps) => (
		<ColWrap {...wrapProps}>
			<DropdownSelect {...selectProps} />
		</ColWrap>
	),
	Text: ({
		wrapProps,
		textInputProps
	}: ColTextProps) => (
		<ColWrap {...wrapProps}>
			<InputText { ...textInputProps } />
		</ColWrap>
	),
	NumberText: ({
		wrapProps,
		numTextInputProps
	}: ColNumTextProps) => (
		<ColWrap {...wrapProps}>
			<InputNumberText {...numTextInputProps} />
		</ColWrap>
	)
}

export default InputCol
