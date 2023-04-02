import React from 'react'
import { controlProps } from '@/globals/js';
import clsx from 'clsx';
import type { Settings } from '@/features/settings/settings.types';

const CopyRight: React.FC<{
	settings?: Settings;
	isSmall?: boolean;
}> = ({ settings, isSmall }) => {

	const copyRight = settings && settings?.copyRight ? settings?.copyRight : null;
	const encodedURL = copyRight && copyRight?.link ? encodeURI(copyRight?.link) : '';
	const copyRightText = `© ${new Date().getFullYear()} ${settings?.copyRight?.label}. All rights reserved.`;

	return (
		<div>
			<a
				className={clsx(
					isSmall ? 'text-xxs' : 'text-xs',
					'text-gray-300-hover'
				)}
				{...controlProps.newTab(encodedURL)}
				role="button"
			>
				{copyRightText}
			</a>
		</div>
	)
}

export default CopyRight
