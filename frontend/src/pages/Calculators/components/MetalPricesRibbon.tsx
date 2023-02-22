import React, { useContext } from 'react'
import clsx from 'clsx';
import { FootNote } from '@/components/labels';
import { controlProps } from '@/globals/js';
import { useMobile } from '@/hooks';
import { MetalPrice, MetalPricesDate } from '.';
import { MetalsContext } from '@/contexts';
import type { MetalsContextType } from '@/contexts/metals-context.types';

const MetalPricesRibbon: React.FC = () => {

	const { metals, metalPrices, hasPrices } = useContext(MetalsContext) as MetalsContextType;

	const { isXSmall } = useMobile();

	const troyOzMessage = 'Metal prices are USD per troy ounce. Troy ounces are used in the precious metals industry where one troy ounce is equal to 31.1034768 grams.';
	const protocol = 'https';
	const metalsAPI = 'metals-api.com/';

	const metalsURL = encodeURI(`${protocol}://${metalsAPI}`);

	if (!hasPrices) return null;

	return (
		<div className={clsx(
			isXSmall ? 'mb-3' : 'my-4',
			"text-center bg-light rounded-3 py-4 text-muted"
		)}>
			{metalPrices?.date ? <MetalPricesDate pricesDate={metalPrices.date} /> : null}
			<div className={clsx(
				'd-flex',
				isXSmall ? 'flex-column' : 'justify-content-center'
			)}>
				{metals?.length ? metals.map(metal => (
					<MetalPrice
						key={metal}
						metalPrices={metalPrices}
						metal={metal}
						asterisk="**"
					/>
				)) : null}
			</div>
			<div className="text-xs text-gray-700 fst-italic fst-light">
				<div className="mt-3 mb-2">
					<FootNote symbol="*" className="me-1">
						<span className="me-1">
							source:
						</span>
						<a
							role="button"
							{...controlProps.newTab(metalsURL)}
						>
							Metals-API
						</a>
					</FootNote>
				</div>
				<div className="px-4 mx-3">
					<FootNote symbol="**" className="me-1">
						{troyOzMessage}
					</FootNote>
				</div>
			</div>
		</div>
	)
}

export default MetalPricesRibbon
