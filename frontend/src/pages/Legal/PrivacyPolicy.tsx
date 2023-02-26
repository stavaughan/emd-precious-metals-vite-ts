import { LegalWrapper, useTermsData } from './components';
import { useAppSelector } from "@/app/hooks";
import type { Settings } from '@/features/settings/settings.types';

const PrivacyPolicy = () => {

	const { settings, isLoading } = useAppSelector(state => state.setting) as {
		settings: Settings
		isLoading: boolean
	};

	const { content } = useTermsData('privacyPolicy', settings);

	return (
		<LegalWrapper
			content={content}
			title="Privacy Policy"
			activePage="privacy"
			settings={settings}
			isLoading={isLoading}
		/>
	)
}

export default PrivacyPolicy
