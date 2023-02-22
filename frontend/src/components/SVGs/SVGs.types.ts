type Dimensions = string | "100%" | "100vh" | "100vw" | "auto";

export interface SVGWrapperProps {
	width?: Dimensions;
	height?: Dimensions;
	viewBox?: string;
	fill?: string;
	x?: string;
	y?: string;
	style?: React.CSSProperties;
	children?: React.ReactNode;
}
