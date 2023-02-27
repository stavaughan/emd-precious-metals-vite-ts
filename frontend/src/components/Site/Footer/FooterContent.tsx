import React from 'react';
import { CopyRight, FooterLinks, SocialLinks } from '.';
import clsx from 'clsx';
import type { Settings } from '@/features/settings/settings.types';

const FooterContent: React.FC<{
	settings?: Settings;
	isSmall?: boolean;
}> = ({ settings, isSmall }) => {

	return (
		<div className={clsx(
			'd-flex align-items-center gap-2',
			isSmall
				? 'flex-column'
				: 'justify-content-between mb-3',
		)}>
			{!isSmall && (
				<>
					<CopyRight
						settings={settings}
						isSmall={isSmall}
					/>
					<SocialLinks settings={settings} />
					<FooterLinks isSmall={isSmall} />
				</>
			)}

			{isSmall && (
				<>
					<SocialLinks settings={settings} />
					<FooterLinks isSmall={isSmall} />
					<CopyRight settings={settings} isSmall={isSmall} />
				</>
			)}
		</div>
	)
}

export default FooterContent
