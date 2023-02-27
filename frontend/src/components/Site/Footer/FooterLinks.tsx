import { SiteData } from '@/data';
import { FooterLink } from '.';
import clsx from 'clsx';

const FooterLinks: React.FC<{
	isSmall?: boolean;
}> = ({ isSmall }) => {

    return (
        <nav
            className={clsx(
				'd-flex align-items-center gap-2',
				isSmall ? 'justify-content-between'
				: 'mb-2 justify-content-end',
			)}
            aria-label="footer"
        >
            {SiteData.footerLinks.map((link, idx) => (
                <FooterLink
                    key={link._id}
                    path={link.path}
					label={link.label}
					isSmall={isSmall}
					idx={idx}
                />
            ))}
        </nav>
    )
}

export default FooterLinks
