import React from 'react'
import { Global } from '@/globals/js';
import { themeClasses } from '@/theme';
import clsx from 'clsx';
import type { InputLabelProps } from './input-components.types';
import { SuperTextNotice } from '.';

const InputLabel: React.FC<InputLabelProps> = ({
	id,
	isRequired,
	optional,
	label,
	labelClass,
	smallLabel,
}) => {

	const defaultClass = smallLabel
		? themeClasses.forms.inputGroups.label.fieldSmall
		: themeClasses.forms.inputGroups.label.field;

	return (
		<label
			htmlFor={id}
			className={clsx(defaultClass, labelClass)}
		>
			{label && Global.upperCaseFirst(label)}
			{optional ? <SuperTextNotice notice="optional" /> : null}
			{isRequired ? <SuperTextNotice notice="required" /> : null}
		</label>
	)
}

export default InputLabel
