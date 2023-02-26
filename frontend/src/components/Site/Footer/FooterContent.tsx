import React from 'react'
import { useMobile } from '@/hooks';
import { CopyRight, FooterLinks, SocialLinks } from '.';
import clsx from 'clsx';
import type { SettingsData } from '@/features/settings/settings.types';

const FooterContent: React.FC<SettingsData> = ({
	settings
}) => {

	const { isXSmall } = useMobile();


    return (
        <div className={clsx(
			'd-flex align-items-center',
			isXSmall
				? 'flex-column'
				: 'justify-content-between',
		)}>
			{!isXSmall && <CopyRight settings={settings} />}
			<SocialLinks settings={settings} />
			<FooterLinks />
			{isXSmall && <CopyRight settings={settings} />}
        </div>
    )
}

export default FooterContent
