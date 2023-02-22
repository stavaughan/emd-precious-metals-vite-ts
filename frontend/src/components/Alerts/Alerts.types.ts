export type InfoAlertProps = {
	message: JSX.Element | string;
	question?: boolean;
	style?: React.CSSProperties;
	className?: string;
	interactive?: boolean;
	width?: number;
}

export type AlertsWrapperProps = {
	className?: string;
	children: React.ReactNode;
};
