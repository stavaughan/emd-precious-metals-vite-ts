import React from 'react'
import { RowImage } from '.';
import type { FileObject } from '@/components/Upload/components/upload.types';

const RowImageCol: React.FC<{
	item: FileObject;
	upload?: boolean;
	setResults: React.Dispatch<React.SetStateAction<FileObject[] | []>>;
}> = ({ item, upload, setResults }) => {

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
