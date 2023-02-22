import React from 'react';
import clsx from 'clsx';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const ImageIcon: React.FC<{
	noLabel?: boolean;
}> = ({ noLabel }) => (
	<FAIcon
		icon="images"
		className={clsx(
			'upload-icon',
			'fa-fw text-slate-400',
			noLabel ? 'fa-2x' : 'fa-3x pb-3'
		)}
		{...noLabel ? {
			style: {
				opacity: '0.7',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
				position: 'absolute'
			}
		} : {}}
	/>
);

export default ImageIcon;
