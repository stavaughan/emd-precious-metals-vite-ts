import React from 'react';
import type { SelectHTMLAttributes } from 'react';
import { DropdownWrapper, DDSelectOptions } from '.';
import type { DropdownSelectProps, OnSelectType, InputLabelProps } from './input-components.types';
import clsx from 'clsx';

const DropdownSelect: React.FC<DropdownSelectProps> = ({
	isRequired,
	onChange,
	...props
}) => {

	const onChangeHandler = (e: OnSelectType) => {
		e.preventDefault();
		const value = e.target.value;
		const defaultValue = `- ${props?.selectLabel || 'SELECT'} -`;
		if (onChange && value !== defaultValue) {
			onChange(value);
		}
	};

	const wrapperProps = {
		id: props?.id,
		label: props?.label,
		...isRequired ? { isRequired } : {},
		...props?.smallLabel ? { smallLabel: props?.smallLabel } : {},
		...props
	} as InputLabelProps;

	const selectProps = {
		id: props?.id,
		className: clsx(
			'form-control form-select',
			props?.flush && 'form-control-flush',
			props?.small && 'form-select-sm',
			props?.selectClass
		),
		"aria-label": props?.label,
		onChange: onChangeHandler,
		onBlur: props?.onBlur,
		value: props?.selected || '',
		multiple: props?.multiple,
		...props
	} as SelectHTMLAttributes<HTMLSelectElement>;

	return (
		<DropdownWrapper {...wrapperProps}>
			<select {...selectProps}>
				<DDSelectOptions
					options={props?.options}
					selectLabel={props?.selectLabel}
				/>
			</select>
		</DropdownWrapper>
	);
};

export default DropdownSelect;
