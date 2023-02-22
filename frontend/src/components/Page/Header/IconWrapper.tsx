import React from 'react';

const IconWrapper: React.FC<{
	children: React.ReactNode;
}> = (props) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
	>
		<defs>
			<linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
				<stop
					offset="0%"
					style={{
						stopColor: 'var(--cyan-300)',
						stopOpacity: '1'
					}}
				/>
				<stop
					offset="100%"
					style={{
						stopColor: 'var(--indigo-700)',
						stopOpacity: '1'
					}}
				/>
			</linearGradient>
		</defs>
		<g
			fill="none"
			fillRule="evenodd"
		>
			{props.children}
		</g>
	</svg>
);

export default IconWrapper;
