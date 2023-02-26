import React, { useCallback, useState, useEffect } from 'react';
import { useMobile } from '@/hooks';
import clsx from 'clsx';
import { RowDelete, RowEditDelete } from '.';

import { ResultsItem, Results, RowActionColProps } from '@/components/Tables/ResultsTable/Results.types';

const RowActionCol: React.FC<RowActionColProps<any>> = (props) => {

	const [showEdit, setShowEdit] = useState(false);

	useEffect(() => {
		if (props?.editDone) {
			setShowEdit(false)
		}
	}, [props?.editDone])

	const { isXSmall } = useMobile();

	const onRemoveImage = useCallback(() => {
		if (props.setResults) {
			props.setResults(prev => prev.map(file => file._id === props.itemID
				? {
					...file,
					image: {}
				} : file as ResultsItem<any>
			) as Results<any>);
		}
	}, [props.itemID, props.setResults]);

	const deleteHandlerTest = !props.setEditData || (!!props.setID && !!props.setResults);

	const onDeleteHandler = () => {
		!!props.setID && props.setID(props.itemID as string)
		!!props.onDelete && props.onDelete(props.itemID as string)
		if (props.setResults) {
			props.setResults(prev => prev.filter(_ => _?._id !== props.itemID));
		}
	};

	const onEditHandler = useCallback(() => {
		if (!showEdit) {
			setShowEdit(true);
			if(props.item && !!props.setEditData) {
				props.setEditData(props.item);
			}
		} else {
			setShowEdit(false);
			if(props.setEditData) {
				props.setEditData(null);
			}
		}
	}, [showEdit, props.setEditData, props.item]);

	return (
		<td style={{ width: 'auto' }}>
			<div className={clsx(
				'd-flex align-items-center d-print-none',
				isXSmall ? 'flex-column' : 'justify-content-end pe-3'
			)}>
				{props.image?.isImage && (
					<span
						role="button"
						className={clsx(
							"link-hover text-xxs",
							!isXSmall ? 'me-3' : 'mb-3 text-center'
						)}
						onClick={onRemoveImage}
					>
						remove image
					</span>
				)}
				{deleteHandlerTest && (
					<RowDelete
						loading={props.loading}
						itemID={props.itemID as string}
						deleteId={props.deleteId}
						handleDelete={onDeleteHandler}
					/>
				)}
				{!!props.setEditData && (
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
