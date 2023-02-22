import React from 'react'
import { Col } from '@/components/HTML';
import clsx from 'clsx';
import { useMobile } from '@/hooks';
import type { AspectRatioProps } from '../image-transformation.types';

const AspectRatio: React.FC<AspectRatioProps> = (props) => {

	const { isXSmall } = useMobile();

	return (
		<Col key={props.ratio._id} cols="12 md-6">
			<div className="d-flex justify-content-start align-items-center">
				<div
					className={clsx(
						'btn p-0',
						props.ratio._id === props.ratioID
							? 'bg-primary-soft border border-2 border-primary'
							: 'bg-light border border-2 border-gray'
					)}
					style={{
						width: props.width,
						height: props.height
					}}
					onClick={() => props.setRatioID(props.ratio._id)}
				>
				</div>
				<div className={clsx(
					isXSmall ? 'text-xs' : 'text-sm',
					'ms-3 my-auto',
					props.ratio._id === props.ratioID
						? 'text-primary font-medium'
						: 'text-secondary'
				)}>
					{props.ratio.label}
				</div>
			</div>
		</Col>
	)
};

export default AspectRatio
