import React from 'react';
import { SingleColCardWrapper } from '@/components/Card';
import clsx from 'clsx';
import type { InputCardProps } from './Forms.types';

const InputCardContainer: React.FC<InputCardProps> = ({
	label,
	errorMsg = '',
	groupClass,
	labelClass,
	borderBottom,
	children,
	exClass,
	cols
}) => {

    return (
        <SingleColCardWrapper
            cols={cols}
            exClass={exClass}
        >
            <div className={clsx(
				groupClass || 'mb-3',
				borderBottom && 'border-bottom'
			)}>
                {label && (
                    <label className={clsx('form-label', labelClass)}>
                        {label}
                    </label>
                )}
                {children}
            </div>
            {errorMsg}
        </SingleColCardWrapper>
    )
}

export default InputCardContainer
