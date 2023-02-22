import React from 'react';
import type { SpinnerProps } from '../Buttons.types';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const LoadingSpinner: React.FC<SpinnerProps> = (props) => (
	<>
		{props?.label ? (
			<>
				<FAIcon icon="circle-notch" spin={true} className="me-2" />
				{props?.wait && 'please wait...'}
			</>
		) : <FAIcon icon="circle-notch" spin={true} />}
	</>
);

export default LoadingSpinner
