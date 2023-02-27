import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { FooterLinkType } from '@/data/SiteData.types';

const FooterLink: React.FC<FooterLinkType> = ({
	label,
	path,
	isSmall,
	idx,
}) => {

	return (
		<div
			className={clsx(
				!isSmall
					? "px-4"
					: idx === 0 ? "ps-0" : "ps-5",
			)}
		>
			<Link
				to={`/${path}`}
				className={clsx(
					isSmall ? "text-xxs" : "text-xs",
					"text-gray-300-hover"
				)}
			>
				{label}
			</Link>
		</div>
	)
}

export default FooterLink
