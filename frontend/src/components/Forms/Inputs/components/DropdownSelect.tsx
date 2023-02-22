import React from 'react';
import { DropdownWrapper } from '.';
import type { DropdownSelectProps, OnSelectType } from './input-components.types';
import clsx from 'clsx';

const DropdownSelect: React.FC<DropdownSelectProps> = ({
	onChange,
	onBlur,
	multiple,
	options,
	label,
	selected,
	flush,
	isRequired,
	id,
	//upperCase,
	small,
	smallLabel,
	selectLabel,
	//componentLabel,
	selectClass,
	...props
}) => {

	const onChangeHandler = (e: OnSelectType) => {
		e.preventDefault();
		const value = e.target.value;
		const defaultValue = `- ${selectLabel || 'SELECT'} -`;
		if (onChange && value !== defaultValue) {
			onChange(value);
		}
	};

	return (
		<DropdownWrapper
			label={label}
			isRequired={isRequired}
			smallLabel={smallLabel}
			id={id}
			{...props}
		>
			<select
				id={id}
				className={clsx(
					'form-control form-select',
					flush && 'form-control-flush',
					small && 'form-select-sm',
					selectClass
				)}
				aria-label={label}
				onChange={onChangeHandler}
				onBlur={onBlur}
				value={selected || ''}
				multiple={multiple}
				{...props}
			>
				<option
					key="default"
					defaultValue="default"
					className="text-slate-300"
				>
					{`- ${selectLabel || 'SELECT'} -`}
				</option>
				{options?.length ? options.map((option, idx) => {
					const optionID = option?._id || option?.id;
					return (
						<option
							className="text-dark"
							key={optionID || idx}
							value={optionID}
						>
							{option.label}
						</option>
					)
				}) : null}
			</select>
		</DropdownWrapper>
	);
};

export default DropdownSelect;
