import React from 'react'
import { useMobile } from '@/hooks';
import { Global } from '@/globals/js';
import { PriceFootNote } from '.';
import type { StoredMetalPrices } from '@/features/metals/metals.types';

const MetalPrice: React.FC<{
	metal: string;
	metalPrices: StoredMetalPrices;
	asterisk: string;
}> = ({
	metal,
	metalPrices,
	asterisk
}) => {

	const { isXSmall } = useMobile();
	const { upperCaseFirst } = Global;

	return (
		<div className={isXSmall ? 'mb-2 mx-5 px-5' : 'text-sm me-3'}>
			{isXSmall ? (
				<div className="text-sm d-flex justify-content-between align-items-center">
					<div className="text-xs text-dark">{upperCaseFirst(metal)}:</div>
					<div className="text-primary font-medium">
						<PriceFootNote
							metalPrices={metalPrices}
							metal={metal}
							ast={asterisk}
						/>
					</div>
				</div>
			) : (
				<>
					<span className="text-xs text-dark me-2">
						{upperCaseFirst(metal)}:
					</span>
					<span className="text-primary font-medium me-1">
						<PriceFootNote
							metalPrices={metalPrices}
							metal={metal}
							ast={asterisk}
						/>
					</span>
				</>
			)}
		</div>
	)
}

export default MetalPrice
