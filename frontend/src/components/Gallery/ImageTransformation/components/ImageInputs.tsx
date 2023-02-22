import React, { useState } from 'react';
import { DropdownSelect, InputLabel, QuantitySelector } from '@/components/Forms/Inputs/components';
import type { ImageInputsProps } from '../image-transformation.types';
import { Col, Row } from '@/components/HTML';
import { SelectAspectRatio } from '.';

const ImageInputs: React.FC<ImageInputsProps> = ({
	scale,
	setScale,
	ratioID,
	setRatioID,
	imageFormats,
	setImageFormat,
	imageFormat,
	base
}) => {

	const [quantity, setQuantity] = useState(scale * 100);

	const onScaleImage = (value: number) => {
		setQuantity(value);
		setScale(value / 100);
	};

	return (
		<div className="container mb-4 p-4 rounded-3 border">
			<Row className="g-3">
				<Col cols="12 md-8 lg-9">
					<SelectAspectRatio
						ratioID={ratioID}
						setRatioID={setRatioID}
						base={base}
					/>
				</Col>
				<Col cols="12 md-4 lg-3">
					<div className="d-flex flex-column align-items-start g-3">
						<div className="mb-3">
							<InputLabel
								id="imagesizeselformat"
								label="Resize (percent)"
							/>
							<QuantitySelector
								qty={quantity}
								setData={onScaleImage}
								loading={false}
							/>
						</div>
						<DropdownSelect
							id="imagecropselformat"
							label="Image Format"
							selected={imageFormat}
							onChange={setImageFormat}
							options={imageFormats}
						/>
					</div>
				</Col>
			</Row>
		</div>
	)
}

export default ImageInputs
