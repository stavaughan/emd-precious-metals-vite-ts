import React, { useRef } from 'react';
import { ImageDropContainer, useUploadLogic } from './components';

import type { HiddenFileInputType } from '@/components/Gallery/ImageTransformation/image-transformation.types';

import type {
	OnFileUploadType
} from '@/components/Forms/Inputs/components/input-components.types';

import type { SetFile, OnUpload } from '@/components/Upload/components/upload.types';

interface ImagesUploadProps {
	type?: string;
	maxSize?: string;
	setFile?: SetFile;
	noLabel?: boolean;
	onUpload?: OnUpload;
	mimeType?: string;
	base64: boolean;
	style?: React.CSSProperties;
	multi?: boolean;
}

const ImagesUpload: React.FC<ImagesUploadProps> = ({
	type,
	maxSize,
	setFile,
	noLabel,
	onUpload,
	mimeType,
	base64,
	style,
	multi
}) => {

	const {
		onImageUpload
	} = useUploadLogic(setFile, onUpload, base64);

	const hiddenFileInput = useRef<HiddenFileInputType | null>(null);

	const onClickHandler = () => {
		hiddenFileInput?.current?.click()
	};

	const handleOnDrop = () => {
		hiddenFileInput?.current?.drop();
	}

	const onFileUpload: OnFileUploadType = (e) => {
		if(!e.target?.files?.length) return;
		onImageUpload(e.target.files as unknown as File[])
	};

	return (
		<>
			<ImageDropContainer
				handleClick={onClickHandler}
				onDropHandler={handleOnDrop}
				onFileUpload={onFileUpload}
				inputRef={hiddenFileInput}
				noLabel={noLabel}
				mimeType={mimeType}
				multiple={multi}
				maxSize={maxSize}
				style={style}
				type={type}
			/>
		</>
	)
}

export default ImagesUpload
