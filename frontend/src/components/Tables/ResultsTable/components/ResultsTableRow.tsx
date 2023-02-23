import { RowImageCol, RowActionCol, ContentRowColumns } from '.';
import React from 'react'
import type { ResultsTableRowProps } from '../Results.types';

const ResultsTableRow: React.FC<ResultsTableRowProps<any>> = (props) => {

	return (
		<tr>
			<RowImageCol
				item={props.item}
				upload={props.upload}
				setResults={props.setResults}
			/>
			<ContentRowColumns
				colClasses={props.colClasses}
				content={props.item?.content}
			/>
			<RowActionCol
				item={props.item}
				image={props.item?.image}
				setResults={props.setResults}
				itemID={props.item?._id}
				setID={props.setID}
				onDelete={props.onDelete}
				loading={props.loading}
				deleteId={props.deleteId}
			/>
		</tr>
	)
}

export default ResultsTableRow
