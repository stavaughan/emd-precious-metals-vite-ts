import React, { useState, useRef } from 'react';
import { useImageMethods, ImageCropWrapper } from './components';
import { ImageDropContainer } from '@/components/Upload/components';
import type { ImageCropProps, HiddenFileInputType } from './image-transformation.types';
import type{ EventTargetType} from '@/components/Forms/Inputs/components/input-components.types';
import type { Crop } from 'react-image-crop';

import 'react-image-crop/dist/ReactCrop.css';

const ImageCrop: React.FC<ImageCropProps> = ({
	setImageUpload,
	setImageID,
	submitLabel
}) => {

	const [imgSrc, setImgSrc] = useState('')
	const [crop, setCrop] = useState<Crop | undefined>();

	const { onSelectImage, onLoadImage } = useImageMethods();

	const hiddenFileInput = useRef<HiddenFileInputType | null>(null);

	const onClickHandler = (): void => {
		hiddenFileInput?.current?.click()
	};

	const handleOnDrop = () => {
		hiddenFileInput?.current?.drop();
	}

	const onFileUpload = (e: EventTargetType) => {
		if (!e.target?.files?.length) return;
		!!setImageUpload && setImageUpload(true)
		onSelectImage({
			setCrop,
			setImgSrc,
			file: e.target.files[0]
		})
	};

	return (
		<>
			<ImageDropContainer
				handleClick={onClickHandler}
				onDropHandler={handleOnDrop}
				onFileUpload={onFileUpload}
				inputRef={hiddenFileInput}
				mimeType="image/*"
				maxSize="5MB"
				type="image"
			/>
			<ImageCropWrapper
				crop={crop}
				setCrop={setCrop}
				setImgSrc={setImgSrc}
				setImageID={setImageID}
				setImageUpload={setImageUpload}
				submitLabel={submitLabel}
				onLoadImage={onLoadImage}
				imgSrc={imgSrc}
			/>
		</>
	);
}

export default ImageCrop
