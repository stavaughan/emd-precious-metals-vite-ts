import React, { useContext, useState } from 'react'
import { Card, CardBody, CardTitleActionsHeader } from '@/components/Card'
import { FormInputs, FetchPricesButton } from '.';
import { LoaderButton } from '@/components/Buttons';
import { MetalsContext } from '@/contexts';
import type { MetalsContextType } from '@/contexts/metals-context.types';

const InputCard: React.FC = () => {

	const {
		hasPrices,
		hasInputs,
		clearResult,
		calculateResult
	} = useContext(MetalsContext) as MetalsContextType;

	const [loading, setLoading] = useState(false);

	return (
		<Card className="d-print-none">
			<CardTitleActionsHeader
				title="Precious Metal Price Calculator"
				section
			>
				{hasPrices ? <FetchPricesButton /> : null}
			</CardTitleActionsHeader>
			<CardBody>
				{(hasInputs || loading) ? (
					<div className="d-flex justify-content-end align-items-center">
						<LoaderButton
							className="btn-sm btn-light me-3"
							label="Clear"
							setOnclick={clearResult}
						/>
						<LoaderButton
							className="btn-sm btn-primary text-sm"
							label="Calculate"
							setOnclick={calculateResult}
							loading={loading}
							setLoading={setLoading}
						/>
					</div>
				) : null}
				{hasPrices ? <FormInputs />  : (
					<div className="text-center">
						<FetchPricesButton />
					</div>
				)}
			</CardBody>
		</Card>
	)
}

export default InputCard
