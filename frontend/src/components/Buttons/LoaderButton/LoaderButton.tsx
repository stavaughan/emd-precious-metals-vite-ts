import React from 'react'
import { LoadingIcon } from '.';
import { Button } from '..';
import type { LoaderButtonProps, OnClickType } from '../Buttons.types';

const LoaderButton: React.FC<LoaderButtonProps> = ({
	className,
	setLoading,
	setOnclick,
	afterLoading,
	disabled,
	loading,
	label,
	wait,
	icon
}) => {

	const setLoaderTimeout = () => {
		if (setLoading) {
			setLoading(true);
			setTimeout(() => {
				setLoading(false);
				!!afterLoading && afterLoading();
			}, 700)
		}
	};

	const onClickHandler = (e: OnClickType) => {
		!!setOnclick && setOnclick(e);
		setLoaderTimeout()
	};

	return (
		<Button
			className={className}
			rest={{
				onClick: onClickHandler,
				...(loading || !!disabled) && { disabled: true }
			}}
		>
			<LoadingIcon
				loading={loading}
				label={label}
				icon={icon}
				wait={wait}
			/>
		</Button>
	)
}

export default LoaderButton
