import React from 'react';
import { PageTitle, TitleIcon } from '.';
import clsx from 'clsx';
import { useMobile } from '@/hooks';

const PageHeader = () => {

	const { isXSmall } = useMobile();

	return (
		<div className={clsx(
			isXSmall ? 'mt-3' : 'mb-3',
			"container-lg py-4 d-print-none"
		)}>
			<div className="d-flex justify-content-start align-items-center">
				<div className="me-3">
					<TitleIcon />
				</div>
				<PageTitle
					pageGroup="calculators"
					baseTitle="Precious Metals Scrap Calculator"
				/>
			</div>
		</div>
	);
};

export default PageHeader;
