import React from 'react';
import clsx from 'clsx';
import { Col } from '@/components/HTML';
import { GradientTitleBlock } from '@/components/Blocks';
import { useContext } from 'react';
import { SettingsContext } from '@/contexts';

type Props = {
	pageGroup?: string;
	baseTitle: string;
}

const PageTitle: React.FC<Props> = ({ pageGroup, baseTitle }) => {

	const { screen, fontSize } = useContext(SettingsContext);
	const isXSmall = screen?.isXSmall;
	const smallText = fontSize?.smallText;

	return (
		<Col className="ms-n3 ms-md-n2">
			{pageGroup && (
				<div
					className={clsx(
						'mt-1 text-uppercase text-slate-500',
						smallText
					)}
					style={{ letterSpacing: isXSmall ? '.11rem' : '.09em' }}
				>
					{pageGroup}
				</div>
			)}
			<GradientTitleBlock
				gradient
				title={baseTitle}
			/>
		</Col>
	)
};

export default PageTitle;
