import React, { useState, useEffect } from 'react'
import { ImageInputs } from '.';
import { CloseButton } from '@/components/Buttons/Type';
import { Button } from '@/components/Buttons';
import type { CropControlsTypes, ImageDimensions } from '../image-transformation.types';

const CropControls: React.FC<CropControlsTypes> = ({
	image,
	controlsProps,
	previewRef,
	setImageID,
	submitLabel
}) => {

	const [previewStyle, setPreviewStyle] = useState<ImageDimensions>({
		width: 0,
		height: 0,
	});

	useEffect(() => {
		if (image?.completedCrop?.width && image?.completedCrop?.height) {
			setPreviewStyle({
				width: image?.completedCrop?.width || 0,
				height: image?.completedCrop?.height || 0
			})
		}
	}, [image?.completedCrop?.height, image?.completedCrop?.width])

	const handleImageDownload = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): Promise<void> => {
		e.preventDefault();
		!!setImageID ? setImageID() : controlsProps.onImageDownload();
	};

	return (
		<>
			{image.completedCrop?.width && (
				<>
					<div className="d-flex justify-content-center align-items-start my-4">
						<div className=" me-3">
							<canvas
								ref={previewRef}
								className="rounded d-block mx-auto shadow-lg"
								style={{
									border: '1px solid var(--slate-300)',
									objectFit: 'contain',
									...previewStyle,
								}}
							/>
						</div>
						<CloseButton handleClose={controlsProps.resetStates} />
					</div>
					<ImageInputs
						scale={image.scale}
						setScale={controlsProps.setScale}
						ratioID={image.ratioID}
						setRatioID={controlsProps.setRatioID}
						imageFormats={controlsProps.imageFormats}
						setImageFormat={controlsProps.setImageFormat}
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
			)}
		</>
	)
}

export default CropControls
