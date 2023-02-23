import React, { useMemo, useCallback } from 'react'
import { controlProps } from '@/globals/js'
import { SiteData } from '@/data';
import type { SettingsData } from '@/features/settings/settings.types';
import { FontAwesomeIcon as FaIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';

type SocialMediaSettings = {
	media: string;
	url: string;
	profileName: string;
	accountLink: string;
}

const SocialLinks: React.FC<SettingsData> = ({ settings }) => {

	const socialObj = useCallback((media: string) => {
		const mediaObj = SiteData.socialMedia.find(_ => _.id === media);
		return {
			name: mediaObj?.name as string,
			baseLink: mediaObj?.baseLink as string
		}
	}, []);

	const siteSocialMedia = useMemo(() => {
		if (!settings?.social?.length) return [];
		return settings?.social?.filter(media => media?.profileName) as SocialMediaSettings[] | [];
	}, [settings]);

	const socialProfiles = useMemo(() => {
		if (!siteSocialMedia || !siteSocialMedia?.length) return [];
		return siteSocialMedia.map(social => ({
			_id: social?.media,
			name: social?.media ? socialObj(social?.media).name : '',
			link: social?.media ? socialObj(social.media).baseLink + social.profileName : ''
		}));
	}, [settings]);

	const sIcon = useCallback((id: string) => {
		const iconObj = SiteData.icons.social.find(icon => icon.id === id);
		return iconObj?.icon as string;
	}, []);

	return (
		<div className="d-flex justify-content-center gap-3 py-3">
			{socialProfiles && socialProfiles?.length ? socialProfiles.map((media) => (
					<a
						key={media._id}
						className="text-gray-300-hover"
						{...controlProps.newTab(media.link)}
						role="button"
					>
						<span className="sr-only">{media.name}</span>
						{media && media?._id && (
							<FaIcon icon={['fab', sIcon(media._id)] as IconProp} />
						)}
					</a>
				)
			) : null}
		</div>
	)
}

export default SocialLinks
