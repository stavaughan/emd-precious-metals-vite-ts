import React, { useContext } from 'react';
import ErrorBoundary from '@/state/ErrorBoundary';
import { BrandComponent } from '@/components/Blocks';
import { SettingsContext } from '@/contexts';
import clsx from 'clsx';
import type { HeaderProps } from './Site.types';

const Header: React.FC<HeaderProps> = ({
	settings,
	isLoading
}) => {

	const { screen } = useContext(SettingsContext);

	const developer = settings?.developer;
	const siteBranding = settings?.siteBranding;

	return (
		<header className="d-print-none">
			<nav
				className="navbar navbar-expand-md navbar-dark navbar-vibrant"
				aria-label="primary"
			>
				<div className="container-fluid">
					<div className={clsx(screen?.isSmall ? 'pb-1' : 'ms-5 pb-2')}>
						<ErrorBoundary>
							<BrandComponent
								baseName={developer?.name}
								mark={siteBranding?.mark}
								isLoading={isLoading}
								small={screen?.isSmall}
							/>
						</ErrorBoundary>
					</div>
				</div>
			</nav>
		</header>
	)
};

export default Header;
