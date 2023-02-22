import { useState, useEffect, useCallback } from 'react';
import type { WindowSize } from './hooks.types';

const useWindowSize = (): { windowSize: WindowSize } => {

	type OnResize<E> = ((this: E, ev: UIEvent) => unknown);

	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	const updateSize = useCallback(() => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}, []);

	useEffect(() => {
		window.onresize = updateSize() as unknown as OnResize<GlobalEventHandlers>;
	}, [updateSize]);

	return { windowSize };
};

export default useWindowSize;
