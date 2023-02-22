import React from 'react'
import clsx from 'clsx';

const CardBody: React.FC<{
	classBody?: string;
	children: React.ReactNode;
}> = ({ classBody, children }) => {

    return (
        <div className={clsx('card-body', classBody)}>
            {children}
        </div>
    );
};

export default CardBody;
