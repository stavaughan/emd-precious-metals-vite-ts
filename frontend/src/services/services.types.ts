export interface PrintComponentProps {
	componentRef: React.MutableRefObject<HTMLDivElement>;
	setPrinting?: React.Dispatch<React.SetStateAction<boolean>>;
	documentTitle: string;
	disable?: boolean;
	margin?: string;
}
