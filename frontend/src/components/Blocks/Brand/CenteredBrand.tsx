import React from 'react'
import clsx from "clsx";
import { BrandComponent } from '..';
import type { CenteredBrandProps } from '../Blocks.types';

import Classes from './BrandComponent.module.css';

const CenteredBrand: React.FC<CenteredBrandProps> = ({
	isSmall,
	loading,
	settings
}) => {

	const developer = settings?.developer;
	const tradeMark = settings?.siteBranding?.mark;

	return (
		<div className={clsx(
			"d-flex justify-content-center py-3",
			Classes["emd-brand-login--logo"]
		)}
		>
			<BrandComponent
				{...developer?.name ? { baseName: developer?.name } : {}}
				{...developer?.subName ? { subName: developer?.subName } : {}}
				{...isSmall ? { small: isSmall } : {}}
				mark={tradeMark}
				isLoading={loading}
				color
			/>
		</div>
	)
}

export default CenteredBrand
