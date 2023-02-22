import React from 'react'
import { InputCardRow } from '.';
import { Col } from '@/components/HTML';
import clsx from 'clsx';
import type { SingleColCardWrapperProps } from './Card.types';

const SingleColCardWrapper: React.FC<SingleColCardWrapperProps> = ({
	cols,
	exClass,
	children
}) => {

    return (
        <InputCardRow cardClass="shadow-none">
            <Col
				cols={clsx('12', cols)}
				{...exClass && { className: exClass }}
            >
				{children}
			</Col>
        </InputCardRow>
    );
};

export default SingleColCardWrapper;
