import React from 'react';
import { ImagesUpload } from '@/components/Upload';
import type { FileImage, FileObject } from '@/components/Upload/components/upload.types';

import Classes from '../styles/ResultsTable.module.css';
import ImgClasses from '../../../Gallery/styles/images.module.css';

type Props = {
	item: FileObject;
	upload?: boolean;
	setResults?: React.Dispatch<React.SetStateAction<FileObject[]>>;
}

const RowImage: React.FC<Props> = ({ item, upload, setResults }) => {

	const onImageUpload = (fileObj: FileImage | null): void => {
		if (setResults && item?._id) {
			setResults(prev => prev?.map(file  => file._id === item._id ? {
				...file,
				image: fileObj
			} : file) as FileObject[]);
		}
	};

	return (
		<>
			{item?.image?.isImage ? (
				<span className={ImgClasses["image-thumbnail"]}>
					<img src={item?.image?.url} alt={item?.image?.name} />
				</span>
			) : (
				<span
					className={`${Classes['image-placeholder']} bg-transparent`}
					style={{ marginBottom: '5px' }}
				>
					{upload ? (
						<ImagesUpload
							type="file"
							mimeType="image/*"
							maxSize="5MB"
							onUpload={onImageUpload}
							style={{ width: '5.46rem', height: '5.46rem' }}
							base64
							noLabel
						/>
					) : (
						<div className={`${Classes['image-placeholder']} bg-transparent`}>
							<ImagesUpload
								type="file"
								mimeType="image/*"
								maxSize="5MB"
								style={{ width: '5.46rem', height: '5.46rem' }}
								base64
								noLabel
							/>
						</div>
					)}
				</span>
			)}
		</>
	)
}

export default RowImage
