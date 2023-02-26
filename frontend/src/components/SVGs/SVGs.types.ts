type Dimensions = string;

export interface SVGWrapperProps {
	width?: Dimensions;
	height?: Dimensions;
	viewBox?: string;
	fill?: string;
	x?: string;
	y?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
	enableBackground?: string;
	'aria-hidden'?: string;
}
