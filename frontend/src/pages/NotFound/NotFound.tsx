import clsx from 'clsx';
import React, { useContext } from 'react';
import { useAppSelector } from "@/app/hooks";
import { useNavigate } from 'react-router-dom';
import { CenteredBrand } from '@/components/Blocks/Brand';
import { SettingsContext } from '@/contexts';
import { SvgIcons } from '@/components/SVGs';
import { AlertPage, Layout } from '@/Layout';
import ErrorBoundary from '@/state/ErrorBoundary';

const NotFound: React.FC = () => {

	const { settings, isLoading } = useAppSelector(state => state.setting);

	const navigate = useNavigate();

	const { screen } = useContext(SettingsContext);
	const isSmall = screen?.isSmall;

	const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		e.preventDefault()
		navigate('/', { replace: true })
	};

	return (
		<Layout
			settings={settings}
			isLoading={isLoading}
		>
			<ErrorBoundary>
				<AlertPage
					title="404 Page Not Found"
					label="Return Home"
					BackGroundSVG={SvgIcons.NotFoundSVG}
					BrandBlock={(
						<div className={clsx(
							'container position-relative',
							isSmall && 'mt-2'
						)}>
							<CenteredBrand
								loading={isLoading}
								isSmall={isSmall}
								settings={settings}
							/>
						</div>
					)}
					onClickHandler={onClickHandler}
				/>
			</ErrorBoundary>
		</Layout>
	);
};

export default NotFound;
