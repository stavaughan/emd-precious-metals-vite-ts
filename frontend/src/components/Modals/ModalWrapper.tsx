import React from 'react';
import { ModalHeader, Modal } from './components';
import type { ModalWrapperProps } from './Modals.types';
import clsx from 'clsx';
import './styles/Modal.css';

const ModalWrapper: React.FC<ModalWrapperProps> = (props) => {

	return (
		<Modal
			modalID={props.modalID}
			modalTitle={props.modalTitle}
			classes={{
				contentClass: props?.contentClass,
				dialogClass: clsx(props?.dialogClass, 'bg-transparent')
			}}
		>
			<ModalHeader
				modalTitle={props.modalTitle}
				labelID={`${props.modalID}Label`}
			/>
			<div className="modal-body">
				{props.children as React.ReactNode}
			</div>
		</Modal>
	)
};

export default ModalWrapper;
