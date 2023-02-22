import React from 'react'
import { Button } from '@/components/Buttons';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const RowDelete: React.FC<{
	loading?: boolean;
	itemID: string;
	deleteId?: string;
	handleDelete: () => void;
}> = ({ loading, itemID, deleteId, handleDelete }) => {

	const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
		e.preventDefault();
		!!handleDelete && handleDelete();
	};

	return (
		<>
			{loading && (itemID === deleteId) ? (
				<FAIcon icon="circle-notch" spin className="text-blue-500 text-xs" />
			) : (
				<Button
					className='text-xs btn-close btn-text-primary shadow-sm rounded-circle d-print-none'
					rest={{
						onClick: onDeleteHandler
					}}
				/>
			)}
		</>
	)
}

export default RowDelete
