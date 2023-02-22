import React from 'react'
import { ImagesUpload } from '@/components/Upload';

import Classes from '../styles/ResultsTable.module.css';

const PlaceholderImage: React.FC<{
	width: string;
	height: string;
}> = ({ width, height }) => {

	return (
		<div className={`${Classes['image-placeholder']} bg-transparent`}>
			<ImagesUpload
				type="file"
				mimeType="image/*"
				maxSize="5MB"
				noLabel={true}
				base64
				style={{ width, height }}
			/>
		</div>
	)
}

export default PlaceholderImage
