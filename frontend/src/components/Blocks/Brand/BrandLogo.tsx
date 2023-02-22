import React from 'react'
import { SvgIcons } from '@/components/SVGs'
import type { BrandLogoProps } from '../Blocks.types'

const BrandLogo: React.FC<BrandLogoProps> = ({ color, width = '55' }) => {

	return (
		<div>
			{color
				? <>{SvgIcons.ColorLogo({ width })}</>
				: <>{SvgIcons.KnockoutLogo({ width })}</>}
		</div>
	)
}

export default BrandLogo
