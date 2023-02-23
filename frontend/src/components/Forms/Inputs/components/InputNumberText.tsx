import React, { useState, useEffect } from 'react';
import { InputComponent } from '.';
import { Global } from '@/globals/js';
import type { InputNumberTextProps } from './input-components.types';

const InputNumberText: React.FC<InputNumberTextProps> = ({
	amount,
	setAmount,
	setEntering,
	placeholder = "00.00",
	required,
	optional,
	onBlur,
	label,
	...props
}) => {

	const [numberValue, setNumberValue] = useState('');

	useEffect(() => {
		if (amount === 0 || !amount) {
			setNumberValue('');
		}
	}, [amount]);

	const handleValueChange = (value: string | '') => {
		const textValue: string = value.trim();
		const numValue = Global.allNumberCharacters(textValue);
		!!setAmount && setAmount(textValue ? Number(numValue) : 0);
		setNumberValue(textValue ? numValue.toString() : '');
		!!setEntering && setEntering(true);
	};

	return (
		<InputComponent
			value={numberValue}
			onChange={handleValueChange}
			placeholder={placeholder}
			required={required}
			optional={optional}
			label={label}
			onBlur={onBlur}
			{...props}		/>
	)
}

export default InputNumberText
