import React from 'react'
import { FootNote } from '@/components/labels';

const MetalPricesDate: React.FC<{ pricesDate: string }> = ({ pricesDate }) => {

	return (
		<div className="mb-3 d-flex justify-content-center align-items-center">
			<div className="me-2 text-dark text-xs">
				<span className="text-gray-900 font-medium">
					<FootNote symbol="*" aft>
						Metal Prices
					</FootNote>
				</span> as of:
			</div>
			<div className="text-xs">{pricesDate}</div>
		</div>
	)
}

export default MetalPricesDate
