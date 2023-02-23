import { useCallback } from 'react';
import { toast } from "react-toastify";
import { acceptedFileTypes } from '.';
import type { Unit8Props } from '../components/upload.types';
import type {
	FileImage,
	ResultsItem,
	SetResult
} from '@/components/Tables/ResultsTable/Results.types';

const useUploadLogic = (
	setFile?: SetResult<any>,
	onUpload?: (file: FileImage) => void,
	base64?: boolean
) => {

	const fileSizeString = useCallback((size: number): string => {
		const fileSize = size / 1000;
		const sizeAdj = fileSize > 1000 ? fileSize / 1000 : fileSize;
		const sizeConfig = fileSize > 1000 ? sizeAdj.toFixed(2) : sizeAdj.toFixed(0)
		const sizeSfx = fileSize > 1000 ? 'MB' : 'KB';
		return `${sizeConfig} ${sizeSfx}`;
	}, []);

	const isImage = useCallback((fileType: string): boolean => {
		const imageTypes = acceptedFileTypes.filter(type => type._id === 'image')[0].types;
		return imageTypes.includes(fileType);
	}, [acceptedFileTypes]);

	const imageBlob = useCallback(async (image: {
		arrayBuffer: () => Promise<ArrayBuffer>;
		type?: string;
	}): Promise<File> => {
		const buffer = await image.arrayBuffer();
		const blob = async () => new Blob([new Uint8Array(buffer)], {
			type: image.type
		}) as unknown as Promise<Blob>;
		const file = await blob() as unknown as File;
		return file;
	}, []);

	const createObjURL = useCallback((file: File): string => {
		return URL.createObjectURL(file);
	}, []);

	const imageUint8Array = useCallback(async ({
		files,
		setFiles,
		setFile,
		onUpload
	}: Unit8Props<any>): Promise<void> => {
		if (files?.length) {
			const image = files[0] as File;
			try {
				const file = await imageBlob(image) as unknown as File;
				const name = image.name.split('.')[0];
				const fileSize = fileSizeString(file.size);
				const url = createObjURL(file);
				const date = new Date(image.lastModified).toLocaleString();
				const fileImage = {
					isImage: isImage(file.type),
					file,
					url,
					name
				} as FileImage;
				const fileObj = {
					_id: name,
					image: fileImage,
					content: [name, fileSize, date],
					file,
					url,
					name,
					date
				} as ResultsItem<any>;
				if (setFile) setFile(fileObj);
				if (setFiles) setFiles(prev => [...prev, fileObj]);
				if (onUpload) onUpload(fileImage)
			} catch (err: unknown) {
				toast.error('Error converting image to uint8 array');
			}
		}
	}, [fileSizeString, isImage]);

	const imageBase64 = useCallback(async ({
		files,
		setFiles,
		setFile,
		onUpload
	}: Unit8Props<any>) => {
		if (files?.length) {
			const file = files[0] as File;
			const regex = /image\/(png|jpeg|jpg|webp|avif)/i;
			if (!file.type.match(regex)) {
				toast.error("Image mime type is not valid");
				return;
			}
			try {
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = async (e: ProgressEvent<FileReader>) => {
					const name = file.name.split('.')[0];
					const fileSize = fileSizeString(file.size);
					const url = reader.result;
					const date = new Date(file.lastModified).toLocaleString();
					const fileImage = {
						isImage: isImage(file.type),
						file,
						url,
						name
					} as FileImage;
					const fileObj = {
						_id: name,
						image: fileImage,
						content: [
							name,
							fileSize,
							date
						],
						file: e.target?.result,
						url,
						name,
						date
					} as ResultsItem<any>;
					if (setFile) setFile(fileObj);
					if (setFiles) setFiles(prev => [...prev, fileObj]);
					if (onUpload && fileImage !== null) {
						onUpload(fileImage)
					}
				}
			} catch (err: unknown) {
				toast.error('Error converting image to uint8 array');
			}
		}
	}, [fileSizeString, isImage]);

	const onImageUpload = useCallback((files: File[]) => {
		base64 ? imageBase64({
			files,
			setFile,
			onUpload
		}) : imageUint8Array({
			files,
			setFile,
			onUpload
		});
	}, [base64, imageBase64, onUpload, imageUint8Array, setFile]);

	return { onImageUpload }
};

export default useUploadLogic;
