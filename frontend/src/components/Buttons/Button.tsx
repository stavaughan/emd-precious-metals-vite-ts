import React from 'react';
import clsx from 'clsx';
import { ButtonProps } from './Buttons.types';

const Button: React.FC<ButtonProps> = ({
	type = 'button',
	className,
	rest,
	children
}) => {

    return (
        <button
            className={clsx('btn', className)}
            type={type || 'button'}
            {...rest}
        >
            {children || null}
        </button>
    );
};

export default Button;
