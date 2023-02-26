import { Link } from 'react-router-dom';
import { FooterLinkType } from '@/data/SiteData.types';

const FooterLink: React.FC<FooterLinkType> = ({ label, path }) => {

	return (
		<div key={label} className="px-4">
			<Link
				to={`/${path}`}
				className="text-xs text-gray-300-hover"
			>
				{label}
			</Link>
		</div>
	)
}

export default FooterLink
