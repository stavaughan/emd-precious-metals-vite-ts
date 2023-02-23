import React from 'react';
import { ResultImage } from '.';

import type { ResultsStateProps } from '@components/Tables/ResultsTable/Results.types';

const ResultsImages: React.FC<ResultsStateProps<any>> = ({ results, setFiles }) => {
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
