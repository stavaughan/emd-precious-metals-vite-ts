import React from 'react';
import { ModalCloseButton } from '@/components/Buttons/Type';
import type { ModalHeaderProps } from '../Modals.types';

const ModalHeader: React.FC<ModalHeaderProps> = ({
	handleModalClose,
	entering,
	modalTitle,
	onClose,
	labelID
}) => {

    return (
        <div className="modal-header">
            <div className="text-normal font-medium text-muted" id={labelID}>
                {modalTitle}
            </div>
            <ModalCloseButton
                handleModalClose={handleModalClose}
                entering={entering}
                onClose={onClose}
            />
        </div>
    );
};

export default ModalHeader;
