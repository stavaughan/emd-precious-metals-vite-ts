import React from 'react';
import { BrandLogo, TradeMark } from '.';
import clsx from 'clsx';
import { SkeletonElem } from '@/components/LoadingSkeleton';
import type { BrandComponentProps } from '../Blocks.types';
import Classes from './BrandComponent.module.css';

const BrandComponent: React.FC<BrandComponentProps> = ({
	isLoading,
	baseName,
	subName,
	mark,
	color,
	small
}) => {

	const name = baseName ? baseName.toUpperCase() : '';

	return (
		<div className={clsx(
			'd-flex justify-content-start align-items-center',
			Classes[color ? 'emd-brand--color' : 'emd-brand--non-color'],
			small && Classes['emd-brand--small']
		)}>
			<div className={Classes['emd-brand--logo']}>
				{!name ? (
					<SkeletonElem
						enableAnimation={isLoading || false}
						className="me-2"
						width="60px"
						height="60px"
						circle
					/>
				) : <BrandLogo color={color} width="55" />}
			</div>
			<div>
				<div className={clsx(
					Classes['emd-brand--name'],
					small && 'ps-1',
					'leading-5'
				)}>
					<TradeMark
						name={name}
						mark={mark}
						isLoading={isLoading}
					/>
				</div>
				{subName && <div className={clsx(
					small ? 'text-xxs' : 'text-xs',
					'text-gray-400 ps-1 leading-5'
				)}>{subName}</div>}
			</div>
		</div>
	);
};

export default BrandComponent;
