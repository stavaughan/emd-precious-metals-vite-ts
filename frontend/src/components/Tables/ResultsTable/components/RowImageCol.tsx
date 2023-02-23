import React from 'react'
import { RowImage } from '.';

import type { ImageRowProps } from '../Results.types';

const RowImageCol: React.FC<ImageRowProps> = ({
	item,
	upload,
	setResults
}) => {

	return (
		<td style={{ width: '7rem' }}>
			<RowImage
				item={item}
				upload={upload}
				setResults={setResults}
			/>
		</td>
	)
}

export default RowImageCol
