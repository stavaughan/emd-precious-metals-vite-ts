export interface PrintComponentProps {
	componentRef: React.MutableRefObject<HTMLDivElement>;
	documentTitle: string;
	disable?: boolean;
	margin?: string;
}
