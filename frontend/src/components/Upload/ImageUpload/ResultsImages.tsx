import React from 'react';
import { ResultImage } from '.';

import type { FileObject } from '../components/upload.types';

const ResultsImages: React.FC<{
	results: FileObject[] | [];
	setFiles: React.Dispatch<React.SetStateAction<FileObject[] | []>>;
}> = ({ results, setFiles }) => {
    return (
        <div className="mt-4 row">
            {results.map(file => (
                <ResultImage
                    key={file._id}
                    file={file}
                    setFiles={setFiles}
                />
            ))}
        </div>
    )
};

export default ResultsImages
