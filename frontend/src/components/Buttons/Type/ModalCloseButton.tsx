import React from 'react'
import { Button } from '..';
import type { ModalCloseButtonProps } from '../Buttons.types';

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
	handleModalClose,
	entering,
	onClose
}) => {

    const onClickHandler = () => {
        if(handleModalClose && entering) {
            handleModalClose();
        }
        if(onClose) {
            onClose();
        }
    };

    return (
        <Button
            type="button"
            className="btn-close"
            rest={{
                ...!entering && {
					"data-bs-dismiss": "modal",
					"aria-label": "Close"
				},
                onClick: onClickHandler
            }}
        ></Button>
    )
}

export default ModalCloseButton
