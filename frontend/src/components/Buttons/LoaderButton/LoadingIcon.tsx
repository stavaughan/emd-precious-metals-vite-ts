import React from 'react';
import { ButtonLabel, LoadingSpinner } from '.';
import type { LoadingIconProps } from '../Buttons.types';

const LoadingIcon: React.FC<LoadingIconProps> = (props) => (
	<>
		{props?.loading
			? <LoadingSpinner label={props?.label} wait={props?.wait} />
			: <ButtonLabel icon={props?.icon} label={props?.label} />}
	</>
);

export default LoadingIcon
