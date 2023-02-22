import React from 'react'
import type { ButtonLabelProps } from '../Buttons.types';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const ButtonLabel: React.FC<ButtonLabelProps> = (props) => (
	<>
		{props?.icon ? (
			<>
				<FAIcon
					icon={props.icon}
					{...props?.label && { className: "me-2" }}
				/>
				{props?.label}
			</>
		) : props?.label}
	</>
);

export default ButtonLabel
