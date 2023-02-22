import React from 'react';
import { InputLabel, InputWrapper } from '.';
import type { InputLabelProps, InputWrapperProps } from './input-components.types';

const InputComponentWrap: React.FC<InputWrapperProps & InputLabelProps & {
	children: React.ReactNode
}> = ({ children, ...props}) => {

	const labelProps: InputLabelProps = {
		...props?.labelClass && { labelClass: props.labelClass },
		...props?.smallLabel ? { smallLabel: props.smallLabel } : {},
		...props?.isRequired ? { isRequired: props.isRequired } : {},
		...props?.optional ? { optional: props.optional } : {},
		...props?.label && { label: props.label },
		...props?.Icon && { Icon: props.Icon },
		...props?.id && { id: props.id },
    };

	const wrapperProps: InputWrapperProps = {
		...props?.helperMsg && { helperMsg: props.helperMsg },
		...props?.groupClass && { groupClass: props.groupClass },
		...props?.wrapStyle && { wrapStyle: props.wrapStyle },
		...props?.showError && { showError: props.showError },
		...props?.errorMsg && { errorMsg: props.errorMsg },
		...props?.InvalidFeedBack && { InvalidFeedBack: props.InvalidFeedBack },
		...props?.floating ? { floating: props.floating } : {},
	};

	return (
		<InputWrapper {...wrapperProps}>
			{(!props?.floating && !!props?.label) && <InputLabel {...labelProps} />}
            {children}
			{(props?.floating && !!props?.label) && <InputLabel {...labelProps} />}
		</InputWrapper>
	)
}

export default InputComponentWrap
