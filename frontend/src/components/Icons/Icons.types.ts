import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface RoundIconBtnProps {
	icon: IconProp;
	color: string;
	buttonClass?: string;
	iconClass?: string;
	loading?: boolean;
	xSmall?: boolean;
	light?: boolean;
	onClick: React.MouseEventHandler<HTMLDivElement>;
	style?: React.CSSProperties;
	alt?: boolean;
}
