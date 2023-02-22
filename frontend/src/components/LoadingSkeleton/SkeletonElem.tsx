import React from 'react';
import Skeleton from 'react-loading-skeleton';
import type { SkeletonProps } from './LoadingSkeleton.types';

const SkeletonElem: React.FC<SkeletonProps> = ({
	width,
	height,
	style,
	className
}) => {

    return (
        <Skeleton
            {...className && { className }}
            style={{
                opacity: '0.7',
                ...width && { width },
                ...height && { height },
                ...style || {}
            }}
        />
    )
}

export default SkeletonElem
