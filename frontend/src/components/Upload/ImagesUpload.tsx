import React, { useRef } from 'react';
import { ImageDropContainer, useUploadLogic } from './components';

import type { HiddenFileInputType } from '@/components/Gallery/ImageTransformation/image-transformation.types';
import type { ImagesUploadProps } from '@/components/Upload/components/upload.types';

const ImagesUpload: React.FC<ImagesUploadProps> = (props) => {

	const {
		onImageUpload
	} = useUploadLogic(props.setFile, props.onUpload, props.base64);

	const hiddenFileInput = useRef<HiddenFileInputType | null>(null);

	const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target?.files?.length) return;
		onImageUpload(e.target.files as unknown as File[])
	};

	return (
		<ImageDropContainer
			handleClick={() => hiddenFileInput?.current?.click()}
			onDropHandler={() => hiddenFileInput?.current?.drop()}
			onFileUpload={onFileUpload}
			inputRef={hiddenFileInput}
			noLabel={props?.noLabel}
			mimeType={props?.mimeType}
			multiple={props?.multi}
			maxSize={props?.maxSize}
			style={props?.style}
			type={props?.type}
		/>
	)
}

export default ImagesUpload
