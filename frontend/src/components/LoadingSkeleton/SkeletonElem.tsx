import React from 'react';
import Skeleton from 'react-loading-skeleton';
import type { SkeletonProps } from 'react-loading-skeleton';

import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonElem: React.FC<SkeletonProps> = (props) => {

	const skeletonProps = {
		...props.enableAnimation && { enableAnimation: props.enableAnimation },
		...props.className && { className: props.className },
		...props.circle && { circle: props.circle },
		style: {
			opacity: '0.5',
			...props.width && { width: props.width },
			...props.height && { height: props.height },
			...props.style && { style: props.style }
		}
	}

    return <Skeleton {...skeletonProps}/>;
}

export default SkeletonElem
