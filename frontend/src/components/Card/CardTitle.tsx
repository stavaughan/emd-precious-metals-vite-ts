import React from 'react'
import { themeClasses } from '@/theme';
import type { CardTitleProps } from './Card.types';

const CardTitle: React.FC<CardTitleProps> = ({ title, count }) => (
	<>
		{title}
		{count && (
			<span className={themeClasses.card.header.count}>
				{count} items
			</span>
		)}
	</>
);

export default CardTitle
