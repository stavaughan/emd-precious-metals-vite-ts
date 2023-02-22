import React from 'react'
import { Button } from '..';
import type { HandleClickType } from '../Buttons.types';

const CloseButton: React.FC<{
	handleClose: HandleClickType;
}> = (props) => {
    return (
        <Button
            type="button"
            className="btn-close btn-text-primary fw-bolder shadow-sm rounded-circle"
            rest={{
                'aria-label': 'Close',
                onClick: props.handleClose
            }}
        />
    );
};

export default CloseButton
