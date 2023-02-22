import React from 'react'
import type { MarkType } from '@/features/settings/settings.types';

import Classes from './BrandComponent.module.css';

const TrademarkSymbol: React.FC<{ mark: MarkType }> = ({ mark }) => {
	if(!mark) return null;
	return (
		<sup className={Classes['emd-brand--trademark']}>
			{mark === 'registered' ? '\u00AE' : '\u2122'}
		</sup>
	)
}

export default TrademarkSymbol
