import React from 'react';
import type { InputHTMLAttributes } from 'react';
import { InputComponentWrap } from '.';
import type {
	InputComponentProps,
	InputWrapperLabelProps,
	OnChangeEventType,
} from './input-components.types';
import clsx from 'clsx';

const InputComponent: React.FC<InputComponentProps> = ({
	onChange,
	type,
	value,
	...props
}) => {

	const inputWrapProps = {
		...(props?.smallLabel || props?.small)
			? { smallLabel: props?.smallLabel || props?.small }
			: {},
		...props?.required
			? { isRequired: props?.required }
			: {},
		...props
	} as InputWrapperLabelProps;

	const onChangeHandler = (e: OnChangeEventType): void => {
		const value = e.target.value as string;
		e.preventDefault();
		if (onChange) onChange(value);
		if (props?.onNumberChange) props.onNumberChange(e);
	};

	const InputProps = {
		type: type || 'text',
		className: clsx(
			'form-control',
			props?.size && `form-control-${props?.size}`,
			props?.flush && 'form-control-flush border-bottom',
			props?.className
		),
		value: value || '',
		...props?.inputRef && { ref: props.inputRef },
		...onChangeHandler && { onChange: onChangeHandler },
		...props.inputStyle && { style: props.inputStyle },
		...props
	} as InputHTMLAttributes<HTMLInputElement>

	return (
		<InputComponentWrap {...inputWrapProps}>
			<input {...InputProps} />
		</InputComponentWrap>
	)
}

export default InputComponent
