import React, { useCallback, useState, useEffect } from 'react';
import { useMobile } from '@/hooks';
import clsx from 'clsx';
import { RowDelete, RowEditDelete } from '.';
import { ResultsItem, Image } from '../Results.types';
import { FileObject } from '@/components/Upload/components/upload.types';

type ItemID = string;

type RowActionColProps = {
	item?: ResultsItem;
	image?: Image;
	setResults?: React.Dispatch<React.SetStateAction<[] | FileObject[]>>;
	setEditData?: React.Dispatch<React.SetStateAction<object | null>>;
	editDone?: boolean;
	itemID: ItemID;
	setID?: React.Dispatch<React.SetStateAction<ItemID>>;
	onDelete?: (id: string) => void;
	loading?: boolean;
	deleteId?: string;
};

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
				} : file as FileObject
			) as FileObject[]);
		}
	}, [itemID, setResults]);

	const deleteHandlerTest = !setEditData || (!!setID && !!setResults);

	const onDeleteHandler = () => {
		!!setID && setID(itemID)
		!!onDelete && onDelete(itemID)
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
						itemID={itemID}
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
