import React from 'react'
import clsx from 'clsx';
import type { RowProps } from './HTML.types';

const Row: React.FC<RowProps> = (props) => {

    return (
        <div
            className={clsx('row', props?.className)}
			{...props?.rowProps}
            {...props?.style && { style: props?.style }}
		>
			{props?.children}
		</div>
    )
}

export default Row
