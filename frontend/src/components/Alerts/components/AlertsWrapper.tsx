import React from 'react'
import clsx from 'clsx';
import { useMobile } from '@/hooks';
import type { AlertsWrapperProps } from '../Alerts.types';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const AlertsWrapper: React.FC<AlertsWrapperProps> = (props) => {

	const { isXSmall } = useMobile();

    return (
        <div
            className={clsx(
				isXSmall ? 'text-xs' : 'text-sm',
				'alert alert-danger d-flex align-items-center my-auto',
				props.className
			)}
            role="alert"
        >
            <FAIcon icon="exclamation-triangle" className="me-2"/>
            {props.children}
        </div>
    );
};

export default AlertsWrapper;
