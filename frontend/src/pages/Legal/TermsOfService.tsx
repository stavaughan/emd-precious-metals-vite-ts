import { LegalWrapper, useTermsData } from './components';
import { useAppSelector } from "@/app/hooks";
import type { Settings } from '@/features/settings/settings.types';

const TermsOfService = () => {

	const { settings, isLoading } = useAppSelector(state => state.setting) as {
		settings: Settings
		isLoading: boolean
	};

	const { content } = useTermsData('termsOfUse', settings);

	return (
		<LegalWrapper
			content={content}
			title="Terms of Use"
			activePage="terms"
			settings={settings}
			isLoading={isLoading}
		/>
	)
}

export default TermsOfService
