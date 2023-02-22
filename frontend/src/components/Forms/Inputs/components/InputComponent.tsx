import React from 'react';
import { InputComponentWrap } from '.';
import type {
	InputComponentProps,
	OnChangeType,
	OnBlurType
} from './input-components.types';
import clsx from 'clsx';

const InputComponent: React.FC<InputComponentProps> = ({
	onChange,
	labelClass,
	inputStyle,
	inputRef,
	groupClass,
	wrapStyle,
	onBlur,
	label,
	Icon,
	helperMsg,
	InvalidFeedBack,
	onNumberChange,
	placeholder,
	floating,
	showError,
	errorMsg,
	className = '',
	smallLabel,
	optional,
	required,
	maxLength,
	flush,
	small,
	type,
	size,
	value,
	id,
	...props
}) => {

	const labelProps = {
		labelClass,
		...smallLabel || small ? { smallLabel: smallLabel || small } : {},
		...required ? { isRequired: required } : {},
		optional,
		label,
		Icon,
		id,
    };

	const wrapperProps = {
		helperMsg,
		groupClass,
		wrapStyle,
		showError,
		errorMsg,
		InvalidFeedBack,
		floating,
	};

	const onChangeHandler = (e: OnChangeType) => {
		const value = e.target.value;
		e.preventDefault();
		if (onChange) onChange(value);
		if (onNumberChange) onNumberChange(e);
	};

	const onBlurHandler = (e: OnBlurType) => {
		e.preventDefault();
		if (onBlur) {
			onBlur(e)
		}
	};

	return (
		<InputComponentWrap
			{...labelProps}
			{...wrapperProps}
		>
			<input
				{...id && { id }}
				type={type || 'text'}
				className={clsx(
					'form-control',
					size && `form-control-${size}`,
					flush && 'form-control-flush border-bottom',
					className
				)}
				value={value || ''}
				{...maxLength && { maxLength }}
				{...inputRef && { ref: inputRef }}
				{...onChangeHandler && { onChange: onChangeHandler }}
				{...onBlurHandler && { onBlur: onBlurHandler }}
				{...inputStyle && { style: inputStyle }}
				{...placeholder && { placeholder }}
				{...props}
			/>
		</InputComponentWrap>
	)
}

export default InputComponent
