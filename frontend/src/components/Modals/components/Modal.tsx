import React from 'react'
import { PortalWrapper } from '@/components/Portals';
import type { ModalProps } from '../Modals.types';
import clsx from 'clsx';

const Modal: React.FC<ModalProps> = ({
	modalID,
	classes,
	modalShow,
	modalTitle,
	staticBackdrop,
	modalRef,
	children,
}) => {

	return (
		<PortalWrapper rootName="overlay-root">
			<div
				id={modalID}
				className={clsx(
					'modal fade',
					modalShow ? 'show' : 'hide'
				)}
				ref={modalRef}
				tabIndex={-1}
				role="dialog"
				aria-labelledby={modalTitle}
				aria-modal={modalShow ? 'true' : 'false'}
				aria-hidden={!modalShow ? 'true' : 'false'}
				style={{ display: modalShow ? 'block' : 'none' }}
				{...staticBackdrop && {
					'data-bs-backdrop': "static",
					'data-bs-keyboard': 'false'
				}}
			>
				<div
					className={clsx(
						'modal-dialog',
						classes?.dialogClass
					)}>
					<div
						className={clsx(
							'modal-content',
							classes?.contentClass
						)}>
						{children}
					</div>
				</div>
			</div>
		</PortalWrapper>
	);
};

export default Modal;
