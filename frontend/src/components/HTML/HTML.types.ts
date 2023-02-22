import React from 'react'

export type RowProps = {
	className?: string;
	rowProps?: React.ReactPropTypes;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}

export interface ContainerProps {
	size?: 'xs' | 'sm' | 'md' | 'lg';
	className?: string;
	props?: React.ReactPropTypes
}

export type ColProps = {
	cols?: string;
	className?: string;
	colProps?: React.ReactPropTypes;
	children?: React.ReactNode;
	props?: React.ReactPropTypes
}
