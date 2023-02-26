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
	return (
		<>
			{name
				? <TrademarkName name={name} mark={mark} />
				: (
					<SkeletonElem
						enableAnimation={isLoading}
						width={screen?.isSmall ? '120px' : '200px'}
						height={screen?.isSmall ? '35px' : '45px'}
					/>
				)}
		</>
	);
}

export default TradeMark
