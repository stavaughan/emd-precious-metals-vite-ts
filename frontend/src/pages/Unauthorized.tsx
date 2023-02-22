import React, { useEffect } from 'react';
import { useAppSelector } from "@/app/hooks";
import { useNavigate } from 'react-router-dom';
import { SvgIcons } from '@/components/SVGs';
import { AlertPage, Layout } from '@/Layout';
import ErrorBoundary from '@/state/ErrorBoundary';

const Unauthorized = () => {

	const { settings, isLoading } = useAppSelector(state => state.setting);

	const navigate = useNavigate();

	useEffect(() => {
		window.onbeforeunload = () => {
			navigate('/');
		}
		return () => {
			window.onbeforeunload = null;
		}
	}, [navigate]);

	return (
		<Layout
			settings={settings}
			isLoading={isLoading}
		>
			<ErrorBoundary>
				<AlertPage
					title="Unauthorized Access."
					label="Go Back"
					BackGroundSVG={SvgIcons.AccessDeniedIcon}
					onClickHandler={() => navigate('/')}
					BrandBlock={null}
				/>
			</ErrorBoundary>
		</Layout>
	)
}

export default Unauthorized
