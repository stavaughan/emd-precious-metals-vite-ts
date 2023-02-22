import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { ThemeType } from '@theme/theme.types';

interface LabelProp {
	label?: string;
}

// When not defining the event directly
export type HandleClickType = React.MouseEventHandler<HTMLButtonElement>;

// When defining the event directly
export type OnClickType = React.MouseEvent<HTMLButtonElement>;

export interface DeleteButtonType {
	deleteButtonHandler: HandleClickType;
	small?: boolean;
}

export interface ButtonProps {
	type?: React.ButtonHTMLAttributes<object | null>['type'];
	className?: string;
	rest?: React.ButtonHTMLAttributes<object | null>;
	children?: React.ReactNode;
}

export interface ModalButtonProps extends ButtonProps {
	modalID?: string;
}

export interface IconButtonProps extends ModalButtonProps {
	icon: IconProp;
	mode: ThemeType;
	onClick?: HandleClickType;
	modalClick?: HandleClickType;
	color?: string;
	margin?: string;
	loading?: boolean;
}

export interface ModalCloseButtonProps extends ButtonProps {
	handleModalClose?: () => void;
	entering?: boolean;
	onClose?: () => void;
}

export interface SpinnerProps extends LabelProp {
	wait?: boolean;
}

export interface ButtonLabelProps extends LabelProp {
	icon?: IconProp;
}

export interface LoadingIconProps extends SpinnerProps, ButtonLabelProps {
	loading?: boolean;
}

export interface LoaderButtonProps extends LoadingIconProps, ButtonProps  {
	setLoading?: (loading: boolean) => void;
	setOnclick?: HandleClickType;
	afterLoading?: () => void;
	disabled?: boolean;
}

export interface PrintButtonProps extends LoaderButtonProps {
	handlePrint: () => void;
	style?: React.CSSProperties;
}

export type ButtonType = 'modal' | 'print' | 'click' | 'dropdown';

export interface ButtonParams {
	_id?: string;
	icon?: IconProp;
	toolTip: string;
	modalID?: string;
	modalClick?: () => void;
	color?: string;
	printRef?: React.MutableRefObject<HTMLDivElement>;
	setPrinting?: React.Dispatch<React.SetStateAction<boolean>>;
	type: ButtonType;
	onClick?: () => void;
	loading?: boolean;
	setDDOption?: React.Dispatch<React.SetStateAction<string>>;
	ddOptions?: string[];
}

export interface RowButtonProps {
	btn: ButtonParams;
	test?: boolean;
	margin?: string;
}

export type ButtonObjectProps = {
	type: ButtonType;
	toolTip: string;
	noDisplay?: boolean;
	Elem: React.FC;
};
