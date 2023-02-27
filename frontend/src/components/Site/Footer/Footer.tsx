import { FooterContent } from '.';
import ErrorBoundary from '@/state/ErrorBoundary';
import React, { useContext } from 'react';
import { SettingsContext } from '@/contexts';
import type { SettingsData } from '@/features/settings/settings.types';
import clsx from 'clsx';

import Classes from './Footer.module.css'

const Footer: React.FC<SettingsData> = ({ settings }) => {

	const { screen } = useContext(SettingsContext);

	const isSmall = screen?.isXSmall || screen?.isSmall;

	return (
		<footer className="gradient-indigo border-top d-print-none">
			<div
				className={clsx(
					isSmall ? 'py-4' : 'pt-4',
					'mx-auto overflow-hidden',
					Classes['padding-x']
				)}
				style={{ maxWidth: '80rem' }}
			>
				<ErrorBoundary>
					<FooterContent settings={settings} isSmall={isSmall} />
				</ErrorBoundary>
			</div>
		</footer>
	)
}

export default Footer
