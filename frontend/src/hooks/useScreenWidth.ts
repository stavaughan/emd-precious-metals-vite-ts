import { useEffect, useCallback, useMemo, useState } from 'react';
import type { ScreenSize } from './hooks.types';

const useScreenWidth = () => {

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const [screen, setScreen] = useState<ScreenSize>({
		isMobile: false,
		isXSmall: false,
		isSmall: false,
		isMedium: false,
		isLarge: false,
		isXLarge: false,
		isXXLarge: false
	});

	const width = useMemo(() => ({
		xsmall: windowWidth < 576,
		small: windowWidth >= 576 && windowWidth < 768,
		medium: windowWidth >= 768 && windowWidth < 992,
		large: windowWidth >= 992 && windowWidth < 1200,
		xlarge: windowWidth >= 1200 && windowWidth < 1400,
		xxlarge: windowWidth >= 1400
	}), [windowWidth]);

	const widthValues = useMemo(() => {
		return {
			isMobile: width.xsmall,
			isXSmall: [width.xsmall, width.small].includes(true),
			isSmall: [width.xsmall, width.small, width.medium].includes(true),
			isMedium: width.medium,
			isLarge: [width.medium, width.large, width.xlarge, width.xxlarge].includes(true),
			isXLarge: [width.large, width.xlarge, width.xxlarge].includes(true),
			isXXLarge: width.xxlarge,
		} as ScreenSize
	}, [width])

	const handleResize = useCallback(() => {
		setWindowWidth(window.innerWidth);
	}, [setWindowWidth]);

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize)
		};
	}, [handleResize]);

	useEffect(() => {
		if (windowWidth) {
			setScreen(widthValues)
		}
	}, [windowWidth, widthValues]);

	return { screen }
}

export default useScreenWidth
