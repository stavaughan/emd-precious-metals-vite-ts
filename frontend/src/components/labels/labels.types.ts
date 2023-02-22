export type AsteriskProps = {
	symbol?: string;
	className?: string;
}

export type FootNoteProps = {
	aft?: boolean;
	children: React.ReactNode;
} & AsteriskProps;
