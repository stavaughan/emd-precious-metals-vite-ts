import { SiteData } from '@/data';
import { FooterLink } from '.';
import { useMobile } from '@/hooks';
import clsx from 'clsx';

const FooterLinks = () => {

	const { isXSmall } = useMobile();

    return (
        <nav
            className={clsx(
				!isXSmall && ' mb-2',
				"mx-n4 d-flex flex-wrap justify-content-center"
			)}
            aria-label="footer"
        >
            {SiteData.footerLinks.map(link => (
                <FooterLink
                    key={link._id}
                    path={link.path}
					label={link.label}
                />
            ))}
        </nav>
    )
}

export default FooterLinks
