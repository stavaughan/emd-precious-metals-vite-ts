import React from 'react';
import { Button } from '..';
import type { ModalButtonProps } from '../Buttons.types';
import { controlProps } from '@/globals/js';

const ModalButton: React.FC<ModalButtonProps> = ({
	className,
	modalID,
	rest,
	children
}) => {

	return (
		<Button
			className={className}
			rest={{
				...modalID && controlProps.modalOpen(modalID),
				...rest
			}}
		>
			{children}
		</Button>
	);
};

export default ModalButton;
