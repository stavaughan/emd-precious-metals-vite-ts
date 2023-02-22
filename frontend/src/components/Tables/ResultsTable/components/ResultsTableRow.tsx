import { RowImageCol, RowActionCol, ContentRowColumns } from '.';
import React from 'react'
import { ColTuple } from '@/contexts/metals-context.types';
import { ResultsItem, SetResults } from '../Results.types';

export interface ResultsTableRowProps {
	item: ResultsItem
	upload?: unknown
	setResults: SetResults
	colClasses: ColTuple
	setID?: React.Dispatch<React.SetStateAction<string>>;
	onDelete?: (id: string) => void
	loading?: boolean
	deleteId?: string
}

const ResultsTableRow: React.FC<ResultsTableRowProps> = ({
	item,
	upload,
	setResults,
	colClasses,
	setID,
	onDelete,
	loading,
	deleteId
}) => {


	return (
		<tr>
			<RowImageCol
				item={item}
				upload={upload}
				setResults={setResults}
			/>
			<ContentRowColumns
				colClasses={colClasses}
				content={item?.content}
			/>
			<RowActionCol
				image={item?.image}
				setResults={setResults}
				itemID={item._id}
				setID={setID}
				onDelete={onDelete}
				loading={loading}
				deleteId={deleteId}
			/>
		</tr>
	)
}

export default ResultsTableRow
