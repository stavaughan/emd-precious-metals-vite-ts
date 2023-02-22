export type ModalClassTypes = {
	dialogClass?: string;
	contentClass?: string;
};

export interface HeaderProps {
	handleModalClose?: () => void;
	modalClose?: boolean;
	entering?: boolean;
	modalTitle?: string;
	onClose?: () => void;
}

export interface ModalHeaderProps extends HeaderProps {
	labelID: string;
}

export interface ModalProps extends HeaderProps {
	modalID: string;
	classes?: ModalClassTypes;
	modalShow?: boolean;
	children: React.ReactNode;
	staticBackdrop?: boolean;
	modalRef?: React.RefObject<HTMLDivElement>;
}

export interface ModalWrapperProps {
	modalID: string;
	modalTitle?: string;
	contentClass?: string;
	dialogClass?: string;
	children: React.ReactNode;
}
