import { RowImageCol, RowActionCol, ContentRowColumns } from '.';
import React from 'react'
import type { ColTuple } from '@/contexts/metals-context.types';
import type { FileObject } from '@/components/Upload/components/upload.types';

export interface ResultsTableRowProps {
	item: FileObject
	upload?: boolean
	setResults: React.Dispatch<React.SetStateAction<FileObject[] | []>>
	colClasses: ColTuple
	setID: React.Dispatch<React.SetStateAction<string>>;
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
