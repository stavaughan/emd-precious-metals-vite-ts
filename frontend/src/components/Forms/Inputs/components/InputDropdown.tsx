import React from 'react'
import { DropdownSelect } from '.';
import type { InputDropdownProps } from './input-components.types';

const InputDropdown: React.FC<InputDropdownProps> = ({
	//id,
	selected,
	onChange,
	options,
	optional,
	isRequired,
	onBlur,
	label,
	smallLabel,
	selectClass,
	...props
}) => {

	return (
		<DropdownSelect
			options={options}
			label={label}
			onChange={onChange}
			selected={selected}
			onBlur={onBlur}
			optional={optional}
			isRequired={isRequired}
			smallLabel={smallLabel}
			selectClass={selectClass}
			{...props}
		/>
	)
}

export default InputDropdown
