import clsx from 'clsx'
import React, { useState, useCallback } from 'react'
import { Button } from '@/components/Buttons'
import type { QuantitySelectorProps } from './input-components.types'

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome'

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
	qty,
	loading,
	setData,
	suffix,
	min = 1,
	deleteItem
}) => {

	const [quantity, setQuantity] = useState(qty);
	const [type, setType] = useState('');

	const loadingDecrement = loading && type === 'decrement';
	const loadingIncrement = loading && type === 'increment';

	const decrementDisabled = loadingDecrement || quantity === min;

	const updateStates = useCallback((qty: number, dir: string) => {
		setType(dir);
		setQuantity(qty)
		setData(qty, dir);
	}, [setData])

	const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (quantity > min) {
			if(min === 0 && quantity === 1 && !!deleteItem) {
				deleteItem()
			} else {
				const newQuantity = quantity - 1;
				updateStates(newQuantity, 'decrement');
			}
		}
	};

	const handleIncrement = (e: { preventDefault: () => void; stopPropagation: () => void; }) => {
		e.preventDefault();
		e.stopPropagation();
		const newQuantity = quantity + 1;
		updateStates(newQuantity, 'increment');
	};

	return (
		<div
			className={clsx(
				"inventory-qty d-flex align-items-center",
				"border border-light rounded-2 text-xs d-print-none",
			)}
			style={{
				width: '6rem',
				height: '2rem'
			}}
		>
			<Button
				className={clsx(
					"d-flex justify-content-center align-items-center m-0",
					decrementDisabled && "border-0",
				)}
				rest={{
					onClick: handleDecrement,
					style: {
						top: '50%',
						left: '50%',
						translate: 'translate(-50%, -50%)',
						height: '2rem',
						width: '2rem',
						background: 'var(--slate-50)',
						FontFace: 'Roboto',
						fontSize: '1rem',
						color: (min === 0 && quantity === 1) ? 'var(--slate-400)' : 'var(--slate-500)',
					} as React.CSSProperties,
					disabled: decrementDisabled
				}}
			>
				<FAIcon
					icon={(min === 0 && quantity === 1) ? ['far', 'trash-alt'] : 'minus'}
					size="2xs"
				/>
			</Button>
			<div
				className="d-flex justify-content-center align-items-center m-0"
				style={{
					width: "2.25rem",
					height: "2rem"
				}}
			>
				{loadingDecrement || loadingIncrement ? (
					<FAIcon
						icon="circle-notch"
						size="2xs"
						spin={true}
					/>
				) : quantity}
				{suffix}
			</div>
			<Button
				className="d-flex justify-content-center align-items-center m-0"
				rest={{
					onClick: handleIncrement,
					style: {
						top: '50%',
						left: '50%',
						translate: 'translate(-50%, -50%)',
						height: '2rem',
						width: '2rem',
						background: 'var(--slate-50)',
						FontFace: 'Roboto',
						fontSize: '1rem',
						color: 'var(--slate-500)'
					} as React.CSSProperties,
					disabled: loadingIncrement && type === 'increment'
				}}
			>
				<FAIcon icon="plus" size="2xs" />
			</Button>
		</div>
	)
}

export default QuantitySelector
