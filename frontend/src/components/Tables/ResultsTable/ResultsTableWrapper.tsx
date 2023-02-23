import React from 'react'
import {
	ResultsTableHead,
	ResultsTableFooter,
	ResultsTableRow
} from './components';
import {
	FooterTuple,
	HeadTuple,
	ColTuple
} from '@/contexts/metals-context.types';
import type { FileObject } from '@/components/Upload/components/upload.types';

interface Props {
	results: FileObject[] | [];
	setResults: React.Dispatch<React.SetStateAction<FileObject[] | []>>;
	headItems: HeadTuple;
	colClasses: ColTuple;
	footerContent?: FooterTuple;
	setID: React.Dispatch<React.SetStateAction<string>>;
	deleteId?: string;
	loading?: boolean
	onDelete?: (id: string) => void;
	upload?: boolean;
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
