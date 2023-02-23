import { FileImage, SetResult, SetResults } from '@/components/Tables/ResultsTable/Results.types';

type OnUpload = (file: FileImage) => void;

export interface Unit8Props<T> {
	files: File[];
	setFiles?: SetResults<T>;
	setFile?: SetResult<T>;
	onUpload?: OnUpload;
}

export interface ImagesUploadProps<T> {
	type?: string;
	maxSize?: string;
	setFile?: SetResult<T>;
	noLabel?: boolean;
	onUpload?: OnUpload;
	mimeType?: string;
	base64: boolean;
	style?: React.CSSProperties;
	multi?: boolean;
}
