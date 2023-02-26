import React from 'react'
import { SvgIcons } from '@/components/SVGs'
import type { BrandLogoProps } from '../Blocks.types';

const BrandLogo: React.FC<BrandLogoProps> = (props) => {

	return (
		<div>
			{props.color ? (
				<SvgIcons.ColorLogo width={props.width} />
			) : (
				<SvgIcons.KnockoutLogo width={props.width} />
			)}
		</div>
	)
}

export default BrandLogo
