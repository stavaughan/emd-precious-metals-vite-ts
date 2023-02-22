import React, { useContext } from 'react'
import { SkeletonElem } from '@/components/LoadingSkeleton';
import { SettingsContext } from '@/contexts';
import { TrademarkName } from '@/components/Blocks/Brand';
import type { TrademarkProps } from '../Blocks.types';

const TradeMark: React.FC<TrademarkProps> = ({
	name,
	mark,
	isLoading
}) => {
	const screen = useContext(SettingsContext).screen;
	if (!isLoading && !name) return null;
	return (
		<>
			{(isLoading || !name) ? (
				<SkeletonElem
					width={screen?.isSmall ? '80px' : '180px'}
					height="25px"
				/>
			) : (
				<TrademarkName name={name} mark={mark} />
			)}
		</>
	);
}

export default TradeMark
