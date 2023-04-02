import React from 'react'
import { Header, Footer } from '@/components/Site';
import { PageHeader } from '@/components/Page';
import type { Settings } from '@/features/settings/settings.types';

type Content = {
	header?: boolean;
	footer?: boolean;
	pageHeader?: boolean;
}

type Props = {
	settings: Settings;
	isLoading: boolean;
	content?: Content;
	children: React.ReactNode;
}

const Layout: React.FC<Props> = ({
	settings,
	isLoading,
	content = {},
	children,
}) => {

	return (
		<>
			<div className="content">
				{content?.header && <Header
					settings={settings}
					isLoading={isLoading}
				/>}
				<main>
					{content?.pageHeader && <PageHeader />}
					{children}
				</main>
			</div>
			{content?.footer && (
				<Footer settings={settings} />
			)}
		</>
	);
};

export default Layout;
