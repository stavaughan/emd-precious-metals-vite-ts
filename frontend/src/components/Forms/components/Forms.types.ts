export interface GroupDeleteProps {
	label: string;
	type?: string;
	ActionLabel?: React.FC;
	test?: boolean;
	onDelete?: React.MouseEventHandler<HTMLButtonElement>;
	labelClass?: string;
	margin?: string;
	sub?: boolean;
}

export type GroupInputRowProps = {
	label: string;
	subLabel?: string;
	labelClass?: string;
	rowClass?: string;
	children: React.ReactNode;
};

export interface InputCardProps {
	label: string;
	errorMsg?: string;
	groupClass?: string;
	labelClass?: string;
	borderBottom?: boolean;
	children?: React.ReactNode;
	exClass?: string;
	cols?: string;
}
