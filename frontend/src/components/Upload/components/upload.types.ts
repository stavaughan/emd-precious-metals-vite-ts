import { FileImage, SetResult, SetResults } from '@/components/Tables/ResultsTable/Results.types';

type OnUpload = (file: FileImage) => void;

export interface Unit8Props {
	files: File[];
	setFiles?: SetResults;
	setFile?: SetResult;
	onUpload?: OnUpload;
}

export interface ImagesUploadProps {
	type?: string;
	maxSize?: string;
	setFile?: SetResult;
	noLabel?: boolean;
	onUpload?: OnUpload;
	mimeType?: string;
	base64: boolean;
	style?: React.CSSProperties;
	multi?: boolean;
}
