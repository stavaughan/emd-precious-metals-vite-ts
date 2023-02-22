import React from 'react'
import clsx from 'clsx';
import { RoundIconBtn } from '@/components/Icons';

const RowEditDelete: React.FC<{
	onSetEditID: () => void
	handleDelete: () => void
	showEdit: boolean
}> = ({ onSetEditID, handleDelete, showEdit }) => {

	const onHandleEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.preventDefault();
		onSetEditID();
	};

	const onHandleDelete = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
		e.preventDefault();
		!!handleDelete && handleDelete();
	};

	return (
		<>
			<RoundIconBtn
				icon={showEdit ? 'times' : "pencil-alt"}
				color={clsx(
					"text-xs",
					showEdit ? 'text-danger' : "text-slate-300"
				)}
				onClick={onHandleEdit}
				xSmall
				alt
			/>
			{!!handleDelete && (
				<RoundIconBtn
					icon={['far', 'trash-alt']}
					color="text-xs text-slate-300"
					onClick={onHandleDelete}
					xSmall
				/>
			)}
		</>
	)
}

export default RowEditDelete
