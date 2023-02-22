import React from 'react'
import {
	ResultsTableHead,
	ResultsTableFooter,
	ResultsTableRow
} from './components';
import {
	StoredMetalValues,
	FooterTuple,
	HeadTuple,
	ColTuple
} from '@/contexts/metals-context.types';

interface Props {
	results: StoredMetalValues;
	setResults: React.Dispatch<React.SetStateAction<StoredMetalValues>>;
	headItems?: HeadTuple;
	colClasses?: ColTuple;
	footerContent?: FooterTuple;
	setID?: () => void;
	deleteId?: string;
	loading?: boolean
	onDelete?: (id: string) => void;
	upload?: unknown
	sticky?: boolean
}

const ResultsTableWrapper: React.FC<Props> = ({
	results,
	setResults,
	headItems,
	colClasses,
	footerContent,
	setID,
	deleteId,
	loading,
	onDelete,
	upload,
}) => {

	return (
		<div className="table-responsive">
			<table className="mt-3 table table-hover table-sm align-middle caption-top">
				<ResultsTableHead
					headItems={headItems}
					colClasses={colClasses}
				/>
				<tbody>
					{results?.length ? results.map(item => (
						<ResultsTableRow
							key={item._id}
							item={item}
							upload={upload}
							setResults={setResults}
							colClasses={colClasses}
							setID={setID}
							onDelete={onDelete}
							loading={loading}
							deleteId={deleteId}
						/>
					)) : null}
				</tbody>
				{footerContent?.length ? (
					<ResultsTableFooter
						content={footerContent}
						colClasses={colClasses}
					/>
				) : null}
			</table>
		</div>
	)
}

export default ResultsTableWrapper
