import React from "react";
import { SVGWrapperProps } from "../SVGs.types";

const SVGWrapper: React.FC<SVGWrapperProps> = ({
	width,
	height,
	viewBox,
	children,
	...props
}) => {

	const explicitHeight = height !== undefined && ['100%', '100vh', '100vw', 'auto'].includes(height);

	const viewBoxHeight = explicitHeight ? width : height;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
			viewBox={viewBox || `0 0 ${width || "24"} ${viewBoxHeight || "24"}`}
			width={width || "24"}
			height={height || "24"}
			{...props}
		>
			{children}
		</svg>
	)
};

export default SVGWrapper;
