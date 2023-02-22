import React from 'react'
import clsx from 'clsx';
import type { ColProps } from './HTML.types';

const Col: React.FC<ColProps> = ({
	cols,
	className,
	children,
	colProps,
	...props
}) => {

	const colString = (propStr: string) => {
		const colArray = propStr.split(' ');
		return colArray.map(cItem => `col-${cItem}`).join(' ');
	};

	return (
		<div
			className={clsx(
				cols ? colString(cols) : 'col',
				className
			)}
			{...colProps || {}}
			{...props}
		>
			{children}
		</div>
	)
}

export default Col;
