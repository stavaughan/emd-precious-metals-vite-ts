import React from 'react'
import clsx from 'clsx'
import type { ContainerProps } from './HTML.types';

const styles = {
	xs: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-2',
	sm: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12',
	md: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-5xl lg:px-8',
	lg: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-7xl lg:px-8',
}

const Container: React.FC<ContainerProps> = ({ size = 'sm', className, ...props }) => (
	<div className={clsx(styles[size], className)} {...props} />
);

export default Container
