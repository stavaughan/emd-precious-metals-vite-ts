import React from 'react';
import clsx from 'clsx';
import type { CardProps } from './Card.types';

const Card: React.FC<CardProps> = ({
	className,
	style,
	printRef,
	children
}) => {

	return (
		<div
			className={clsx('card', className)}
			{...printRef && { ref: printRef }}
			{...style && { style }}
		>
			{children}
		</div>
	);
};

export default Card;
