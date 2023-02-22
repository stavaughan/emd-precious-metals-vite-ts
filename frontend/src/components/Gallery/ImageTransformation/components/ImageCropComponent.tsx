import React, { useEffect, useState } from 'react'
import type { ReactCropProps } from 'react-image-crop'
import ReactCrop from 'react-image-crop'
import type {
	ImageCropComponentTypes,
	LoadImage
} from '../image-transformation.types'

const ImageCropComponent: React.FC<ImageCropComponentTypes> = ({
	image,
	imageProps,
	crop,
	setCrop,
	imgSrc,
	onLoadImage = () => { }
}) => {

	const [currentTarget, setCurrentTarget] = useState<HTMLImageElement | null>(null);

	useEffect(() => {
		if (currentTarget !== null && currentTarget?.width) {
			onLoadImage({
				imageRef: imageProps.imageRef,
				currentTarget,
				aspectRatio: image.aspectRatio,
				setCrop
			} as LoadImage);
		}
	}, [currentTarget, imageProps.imageRef, image.aspectRatio, setCrop, onLoadImage])

	const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		const target = e.currentTarget as HTMLImageElement | null;
		setCurrentTarget(target);
	}

	const onCropChange: ReactCropProps['onChange'] = (_crop, percentCrop) => {
		setCrop(() => percentCrop) as void;
	};

	return (
		<ReactCrop
			crop={crop}
			onChange={onCropChange}
			onComplete={imageProps.setCompletedCrop}
			aspect={image.aspectRatio}
			className="rounded d-block mx-auto"
		>
			{imgSrc ? (
				<img
					alt="crop"
					src={imgSrc}
					style={{ transform: `scale(${image.scale}) rotate(${image.rotate}deg)` }}
					onLoad={onImageLoad}
				/>
			) : null}
		</ReactCrop>
	)
}

export default ImageCropComponent
