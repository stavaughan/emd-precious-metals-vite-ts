import React from 'react'
import { ImageCropComponent } from '.';
import { useImageCrop, CropControls } from '.';
import type {
	UseImageCrop,
	ImageCropWrapperTypes
} from '../image-transformation.types';

const ImageCropWrapper: React.FC<ImageCropWrapperTypes> = ({
	crop,
	setCrop,
	imgSrc,
	submitLabel,
	setImageUpload,
	onLoadImage,
	setImageID,
	setImgSrc
}) => {

	const { image, imageProps, controlsProps } = useImageCrop({
		setImageUpload,
		setImgSrc,
		setCrop
	} as UseImageCrop);

	return (
		<div>
			{imgSrc && (
				<div className="d-flex justify-content-center">
					<ImageCropComponent
						image={image}
						imageProps={imageProps}
						crop={crop}
						setCrop={setCrop}
						onLoadImage={onLoadImage}
						imgSrc={imgSrc}
					/>
				</div>
			)}
			<CropControls
				image={image}
				controlsProps={controlsProps}
				previewRef={controlsProps.previewRef}
				submitLabel={submitLabel}
				setImageID={setImageID}
			/>
		</div>
	)
}

export default ImageCropWrapper
