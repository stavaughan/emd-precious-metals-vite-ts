import React from 'react'
import { Header, Footer } from '@/components/Site';
import { PageHeader } from '@/components/Page';
import type { Settings } from '@/features/settings/settings.types';

type Props = {
	settings: Settings
	isLoading: boolean
	children: React.ReactNode
}

const Layout: React.FC<Props> = ({ settings, isLoading, children }) => {

	return (
		<>
			<div className="content">
				<Header
					settings={settings}
					isLoading={isLoading}
				/>
				<main>
					<PageHeader />
					{children}
				</main>
			</div>
			<Footer settings={settings} />
		</>
	);
};

export default Layout;
