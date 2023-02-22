import React, { useState, useEffect } from 'react'
import { ImageInputs, ImageCropComponent, useImageCrop } from '.';
import { CloseButton } from '@/components/Buttons/Type';
import { Button } from '@/components/Buttons';
import type { UseImageCrop, ImageCropContainerProps } from '../image-transformation.types';

const ImageCropContainer: React.FC<ImageCropContainerProps> = ({
	crop,
	setCrop,
	imgSrc,
	submitLabel,
	setImageUpload,
	setImageID,
	setImgSrc
}) => {

	const [previewStyle, setPreviewStyle] = useState<React.CSSProperties>({
		border: '1px solid var(--slate-300)',
		objectFit: 'contain',
		width: 0,
		height: 0,
	});

	const { image, imageProps, controlsProps } = useImageCrop({
		setImageUpload,
		setImgSrc,
		setCrop
	} as UseImageCrop);



	useEffect(() => {
		if (controlsProps?.completedCrop !== null && controlsProps?.completedCrop?.width) {
			setPreviewStyle(prev => ({
				...prev,
				width: controlsProps?.completedCrop?.width,
				height: controlsProps?.completedCrop?.height
			}))
		}
	}, [controlsProps?.completedCrop])

	const handleImageDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();
		setImageID
			? setImageID()
			: controlsProps.onImageDownload();
	};

	return (
		<div>
			{imgSrc && (
				<div className="d-flex justify-content-center">
					<ImageCropComponent
						image={image}
						imageProps={imageProps}
						crop={crop}
						setCrop={setCrop}
						imgSrc={imgSrc}
					/>
				</div>
			)}
			{controlsProps?.completedCrop?.width ? (
				<>
					<div className="d-flex justify-content-center align-items-start my-4">
						<div className=" me-3">
							<canvas
								ref={controlsProps.previewRef}
								className="rounded d-block mx-auto shadow-lg"
								style={previewStyle}
							/>
						</div>
						<CloseButton handleClose={controlsProps.resetStates} />
					</div>
					<ImageInputs
						scale={image.scale}
						setScale={controlsProps?.setScale}
						ratioID={image.ratioID}
						setRatioID={controlsProps.setRatioID}
						imageFormats={controlsProps.imageFormats}
						setImageFormat={controlsProps?.setImageFormat}
						imageFormat={image.imageFormat}
						base={controlsProps.BASE}
					/>
					<div className="mb-3 text-center">
						<Button
							className="btn-sm text-gray-500 me-3"
							rest={{ onClick: controlsProps.resetStates }}
						>
							Cancel
						</Button>
						<Button
							className="btn-sm btn-bd-primary-indigo"
							rest={{ onClick: handleImageDownload }}
						>
							{submitLabel || 'Download'} Image
						</Button>
					</div>
				</>
			) : null}
		</div>
	)
}

export default ImageCropContainer
