import React from 'react'
import { ResultsTableHead, ResultsTableFooter, ResultsTableRow } from './components';
import type { ResultsTableWrapperTypes } from './Results.types';

const ResultsTableWrapper: React.FC<ResultsTableWrapperTypes> = (props) => {

	return (
		<div className="table-responsive">
			<table className="mt-3 table table-hover table-sm align-middle caption-top">
				<ResultsTableHead
					headItems={props.headItems}
					colClasses={props.colClasses}
				/>
				<tbody>
					{props.results?.length ? props.results.map(item => (
						<ResultsTableRow
							key={item._id}
							item={item}
							upload={props.upload}
							setResults={props.setResults}
							colClasses={props.colClasses}
							setID={props.setID}
							onDelete={props.onDelete}
							loading={props.loading}
							deleteId={props.deleteId}
						/>
					)) : null}
				</tbody>
				{props.footerContent?.length ? (
					<ResultsTableFooter
						content={props.footerContent}
						colClasses={props.colClasses}
					/>
				) : null}
			</table>
		</div>
	)
}

export default ResultsTableWrapper
