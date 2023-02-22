import React from 'react'
import { Button } from '@/components/Buttons';
import clsx from 'clsx';
import type { DeleteButtonType } from '../Buttons.types';

const DeleteButton: React.FC<DeleteButtonType> = ({
	deleteButtonHandler,
	small
}) => {

    return (
        <Button
            className={clsx(
				"btn-close shadow-sm rounded-circle my-auto",
				small && 'text-sm',
			)}
			rest={{
				onClick: deleteButtonHandler,
				'aria-label': 'Delete'
			}}
        />
    );
};

export default DeleteButton;
