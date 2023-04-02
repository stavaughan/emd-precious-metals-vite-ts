import React from 'react'
import type { IOption, DDSelectOptionsProps } from './input-components.types';

const DDSelectOptions: React.FC<DDSelectOptionsProps> = (props) => {
	return (
		<>
			<option
				key="default"
				defaultValue="default"
				className="text-slate-300"
			>
				{`- ${props?.selectLabel || 'SELECT'} -`}
			</option>
			{props?.options?.length ? props.options.map((option: IOption, idx: number) => {
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
		</>
	)
}

export default DDSelectOptions
