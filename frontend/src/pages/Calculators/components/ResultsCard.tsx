import React, { useContext } from 'react'
import { Card, CardBody, CardTitleActionsHeader } from '@/components/Card';
import { ResultsTableWrapper, ResultsHeaderBar } from '@/components/Tables/ResultsTable';
import { ButtonRow } from '@/components/Buttons/ButtonRows';
import { Global } from '@/globals/js';
import { MetalsContext } from '@/contexts';
import type { MetalsContextType } from '@/contexts/metals-context.types';

const ResultsCard: React.FC = () => {

	const {
		printRef,
		setStoredValues,
		actionButtons,
		pageContent,
		metalPrices,
		handleDelete,
		resultsContent
	} = useContext(MetalsContext) as MetalsContextType;

	if (!resultsContent?.length) return null;

	return (
		<div ref={printRef}>
			<Card>
				<CardTitleActionsHeader title="Metals Results Values" section>
					<span className="d-print-none">
						<ButtonRow btnItems={actionButtons} />
					</span>
				</CardTitleActionsHeader>
				<CardBody>
					<div className="mt-2">
						<ResultsHeaderBar
							quantity={resultsContent.length}
							headContent={metalPrices?.date && (
								<div className="text-xs text-slate-500">
									{Global._Date.formatted(metalPrices.date, 'full')}
								</div>
							)}
						/>
						<ResultsTableWrapper
							results={resultsContent}
							setResults={setStoredValues} // TODO: Create generic type for this
							headItems={pageContent?.head}
							colClasses={pageContent?.colClasses}
							footerContent={pageContent?.footer}
							onDelete={handleDelete}
							upload={true}
						/>
					</div>
				</CardBody>
			</Card>
		</div>
	)
}

export default ResultsCard
