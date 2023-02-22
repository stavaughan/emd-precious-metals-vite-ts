import React from 'react'
import { useMobile } from '@/hooks';
import { GradientTitleBlock } from '@/components/Blocks';
import { Button } from '@/components/Buttons'
import clsx from 'clsx';

import Classes from '../pages/NotFound/NotFound.module.css';

type AlertPageProps = {
	title: string;
	label: string;
	BackGroundSVG: React.FC;
	onClickHandler: React.MouseEventHandler<HTMLButtonElement>;
	BrandBlock: React.ReactNode;
}

const AlertPage: React.FC<AlertPageProps> = ({
	title,
	label,
	BackGroundSVG,
	onClickHandler,
	BrandBlock
}) => {

	const { isXSmall } = useMobile();

	return (
		<>
			<div className={!isXSmall ? 'mt-3' : ''}>
				<div className="container">
					<div className="d-flex justify-content-center">
						<div className={clsx(
							"d-flex flex-column align-items-center",
							!isXSmall && 'mt-3'
						)}>
							{BrandBlock}
							<div className={Classes['notfound--bg-image']}>
								<BackGroundSVG />
							</div>
							<div className={isXSmall ? 'my-2' : 'my-3'}>
								<GradientTitleBlock
									title={title}
									gradient
								/>
							</div>
							<div className="mt-4 mb-5">
								<Button
									className={clsx(
										'btn rounded-pill btn-bd-primary m-0',
										isXSmall ? 'btn-sm py-2 px-3' : 'btn-md'
									)}
									rest={{
										onClick: onClickHandler
									}}
								>
									{label}
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
			{isXSmall && BrandBlock}
		</>
	)
}

export default AlertPage
