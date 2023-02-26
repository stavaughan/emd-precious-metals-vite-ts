import React from 'react'
import { controlProps } from '@/globals/js';
import { useMobile } from '@/hooks';
import clsx from 'clsx';
import type { SettingsData } from '@/features/settings/settings.types';

const CopyRight: React.FC<SettingsData> = ({ settings }) => {

	const { isXSmall } = useMobile();

	const copyRight = settings && settings?.copyRight ? settings?.copyRight : null;
	const encodedURL = copyRight && copyRight?.link ? encodeURI(copyRight?.link) : '';

	const copyRightText = `Copyright © ${new Date().getFullYear()} ${settings?.copyRight?.label}`

	return (
		<div>
			<a
				className={clsx(
					isXSmall ? 'text-xs' : 'text-sm',
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
