import React from 'react'
import { FootNote } from '@/components/labels';
import { amountUSD } from '@/globals/js';
import type { StoredMetalPrices } from '@/features/metals/metals.types';

const PriceFootNote: React.FC<{
	metalPrices: StoredMetalPrices,
	metal: string;
	ast: string;
}> = ({ metalPrices, metal, ast }) => {

	if (!metalPrices[metal as keyof typeof metalPrices]) {
		return <>no price..</>
	}

	const price = metalPrices[metal as keyof typeof metalPrices] as number;

	return (
		<FootNote
			className="text-xxs text-slate-500 ms-1"
			symbol={ast}
			aft
		>
			{amountUSD({ num: price, dec: 2 })}
		</FootNote>
	)
}

export default PriceFootNote
