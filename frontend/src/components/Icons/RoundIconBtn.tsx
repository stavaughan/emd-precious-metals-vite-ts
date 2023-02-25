import clsx from 'clsx';
import type { RoundIconBtnProps } from './Icons.types';

import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';

const RoundIconBtn = ({
	icon,
	color,
	onClick,
	buttonClass,
	iconClass,
	loading,
	xSmall,
	style,
	alt,
	...props
}: RoundIconBtnProps) => {
	return (
		<div
			role="button"
			className={clsx(
				'd-print-none',
				xSmall ? "circle-sm" : "circle",
				buttonClass
			)}
			onClick={onClick}
			{...style && { style }}
			{...props}
		>
			<div className={clsx(
				alt ? 'hover-icon-alt' : 'hover-icon',
				color
			)}
			>
				<FAIcon
					icon={loading ? 'circle-notch' : icon}
					{...loading && { spin: true }}
					{...iconClass && { className: iconClass }}
				/>
			</div>
		</div>
	)
}

export default RoundIconBtn
