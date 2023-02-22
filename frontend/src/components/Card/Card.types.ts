export type CardProps = {
	className?: string;
	style?: React.CSSProperties;
	printRef?: React.RefObject<HTMLDivElement>;
	children?: React.ReactNode;
};

export interface InputCardRowProps {
	gap?: string;
	cardClass?: string;
	children: React.ReactNode;
}

export interface ContentCardProps {
	cardClass?: string;
	children: React.ReactNode;
}

export interface SingleColCardWrapperProps {
	cols?: string;
	exClass?: string;
	children: React.ReactNode;
}

export interface CardTitleProps {
	title: string;
	count?: number;
}

export interface CardTitleHeaderProps extends CardTitleProps {
	description?: string;
	btnCount?: number;
	section?: boolean;
	children: React.ReactNode;
}
