import { useMobile } from '@/hooks';
import { CenteredBrand } from '@/components/Blocks/Brand';
import { BackToTop } from '@/components/Widgets';
import { Row } from '@/components/HTML';
import { Navigation, LegalContent } from '.';
import { Content } from '../Legal.types';
import type { Settings } from '@/features/settings/settings.types';

const LegalWrapper: React.FC<{
	content: Content;
	title: string;
	activePage: 'terms' | 'privacy';
	settings: Settings;
	isLoading: boolean;
}> = ({
	content,
	title,
	activePage,
	settings,
	isLoading = false
}) => {

	const { isXSmall } = useMobile();

	return (
		<div className="mt-3 pb-5">
			<div className="container">
				<div className="d-flex justify-content-center">
					<CenteredBrand
						isSmall={isXSmall}
						loading={isLoading}
						settings={settings}
					/>
				</div>
				<Row {...isXSmall && { className: 'mb-4 gap-4' }}>
					<Navigation activePage={activePage} />
					<LegalContent
						title={title}
						content={content}
					/>
				</Row>
			</div>
			<BackToTop />
		</div>
	)
}

export default LegalWrapper
