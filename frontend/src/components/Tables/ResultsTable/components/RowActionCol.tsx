import React, { useCallback, useState, useEffect } from 'react';
import { useMobile } from '@/hooks';
import clsx from 'clsx';
import { RowDelete, RowEditDelete } from '.';

import { ResultsItem, Results, RowActionColProps } from '@/components/Tables/ResultsTable/Results.types';

const RowActionCol: React.FC<RowActionColProps> = ({
	item,
	image,
	setResults,
	setEditData,
	editDone = false,
	itemID,
	setID,
	onDelete,
	loading,
	deleteId
}) => {

	const [showEdit, setShowEdit] = useState(false);

	useEffect(() => {
		if (editDone) {
			setShowEdit(false)
		}
	}, [editDone])

	const { isXSmall } = useMobile();

	const onRemoveImage = useCallback(() => {
		if (setResults) {
			setResults(prev => prev.map(file => file._id === itemID
				? {
					...file,
					image: {}
				} : file as ResultsItem
			) as Results);
		}
	}, [itemID, setResults]);

	const deleteHandlerTest = !setEditData || (!!setID && !!setResults);

	const onDeleteHandler = () => {
		!!setID && setID(itemID as string)
		!!onDelete && onDelete(itemID as string)
		if (setResults) {
			setResults(prev => prev.filter(_ => _?._id !== itemID));
		}
	};

	const onEditHandler = useCallback(() => {
		if (!showEdit) {
			setShowEdit(true);
			if(item && !!setEditData) {
				setEditData(item);
			}
		} else {
			setShowEdit(false);
			if(setEditData) {
				setEditData(null);
			}
		}
	}, [showEdit, setEditData, item]);

	return (
		<td style={{ width: 'auto' }}>
			<div className={clsx(
				'd-flex align-items-center d-print-none',
				isXSmall ? 'flex-column' : 'justify-content-end pe-3'
			)}>
				{image?.isImage && (
					<span
						role="button"
						className={clsx(
							"link-hover ",
							!isXSmall ? 'me-3 text-xs' : 'mb-3 text-xxs text-center'
						)}
						onClick={onRemoveImage}
					>
						remove image
					</span>
				)}
				{deleteHandlerTest && (
					<RowDelete
						loading={loading}
						itemID={itemID as string}
						deleteId={deleteId}
						handleDelete={onDeleteHandler}
					/>
				)}
				{!!setEditData && (
					<RowEditDelete
						onSetEditID={onEditHandler}
						handleDelete={onDeleteHandler}
						showEdit={showEdit}
					/>
				)}
			</div>
		</td>
	)
}

export default RowActionCol
