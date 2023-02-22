import { useMemo } from 'react';

const useFontSize = ({ isXSmall }: { isXSmall: boolean; }) => {

	const font = useMemo(() => ({
		smallText: isXSmall ? 'text-xs' : 'text-sm',
		mediumText: isXSmall ? 'text-sm' : 'text-base',
		largeText: isXSmall ? 'text-base' : 'text-lg'
	}), [isXSmall]);

	return { ...font };
}

export default useFontSize;
