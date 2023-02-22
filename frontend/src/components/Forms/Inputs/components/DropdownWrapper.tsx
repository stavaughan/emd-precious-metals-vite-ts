import React from 'react'
import { InputLabel } from '.';
import type { InputLabelProps } from './input-components.types';

const DropdownWrapper: React.FC<InputLabelProps & {
	children: React.ReactNode;
}> = (props) => {

	return (
		<div className="dropdown">
			{props?.label && (
				<InputLabel
					id={props?.id}
					label={props?.label}
					smallLabel={props?.smallLabel}
					{...props}				/>
			)}
			{props?.children}
		</div>
	);
};

export default DropdownWrapper;
