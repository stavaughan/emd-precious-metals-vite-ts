import React from 'react';
import { Col } from '@/components/HTML';
import type { WrapProps } from './components/input-components.types';

const ColWrap: React.FC<WrapProps & {
	children: React.ReactNode;
}> = ({ cols, colClass, children }) => (
	<Col
		cols={cols || '12'}
		{...colClass ? { className: colClass } : {}}
	>
		{children}
	</Col>
);

export default ColWrap
