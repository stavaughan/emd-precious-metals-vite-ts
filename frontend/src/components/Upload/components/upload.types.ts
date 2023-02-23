export type FileImage = {
	isImage: boolean;
	file?: File;
	url?: string;
	name?: string;
	lastModified?: number;
}

type Name = string;
type Size = string;
type Date = string;

type FileContent = [Name, Size, Date];

export type FileObject = {
	_id: string;
	image?: FileImage;
	content: FileContent | [];
	file?: File | string | ArrayBuffer | null;
	url?: string;
	name?: string;
	date?: string;
	isImage?: boolean;
}

export type Files = FileObject[] | [];

export type SetFile = React.Dispatch<React.SetStateAction<FileObject | null>>;

export type SetFiles = React.Dispatch<React.SetStateAction<Files>>;

export type OnUpload = (file: FileImage) => void;

export interface Unit8Props {
	files: File[];
	setFiles?: SetFiles;
	setFile?: SetFile;
	onUpload?: (file: FileImage) => void;
}
