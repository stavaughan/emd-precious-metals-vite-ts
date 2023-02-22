import React from 'react';
import { AlertsWrapper } from '@/components/Alerts/components';
import type { InputWrapperProps } from './input-components.types';
import clsx from 'clsx';

const InputWrapper: React.FC<InputWrapperProps & {
	children: React.ReactNode
}> = ({
	InvalidFeedBack,
	floating,
	groupClass,
	helperMsg,
	wrapStyle,
	errorMsg,
	showError,
	Icon,
	children
}) => {

	return (
		<>
			<div
				className={clsx(floating && 'form-floating', groupClass)}
				{...wrapStyle && { style: wrapStyle }}
			>
				{children}
				{Icon && Icon}
				{helperMsg && (
					<div className="alert alert-info text-xs my-2" role="alert">
						{helperMsg}
					</div>
				)}
				{InvalidFeedBack && (
					<div className="my-2">
						{InvalidFeedBack}
					</div>
				)}
			</div>
			{showError && <AlertsWrapper>{errorMsg}</AlertsWrapper>}
		</>
	)
}

export default InputWrapper
