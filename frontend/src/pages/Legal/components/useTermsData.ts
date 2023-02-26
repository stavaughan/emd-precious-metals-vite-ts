import { SiteDisclosures } from '.';
import { tempData } from './tempData';
import { useMemo } from 'react';
import type { LegalBusiness, Content } from '../Legal.types';
import type { Settings } from '@/features/settings/settings.types';

const useTermsData = (
	dataKey: 'termsOfUse' | 'privacyPolicy',
	settings: Settings
) => {

	const siteName = settings.siteInfo?.siteName
		|| tempData.siteName as LegalBusiness['siteName'];

	const siteInfo = settings.siteInfo?.siteName
		? settings.siteInfo
		: tempData as LegalBusiness;

	const content = useMemo(() => {

		const disclosureContent = SiteDisclosures[
			dataKey as keyof typeof SiteDisclosures
		] as (
			siteName: LegalBusiness['siteName'],
			data: LegalBusiness
		) => Content;

		return disclosureContent(siteName, siteInfo);
	}, [dataKey]);

	return { content }
}

export default useTermsData
