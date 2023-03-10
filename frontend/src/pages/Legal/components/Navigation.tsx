import { useMobile } from '@/hooks';
import { Link } from 'react-router-dom';
import { Col } from '@/components/HTML';
import clsx from 'clsx';

const Navigation: React.FC<{
	activePage: 'terms' | 'privacy';
}> = ({ activePage }) => {

	const { isXSmall } = useMobile();

	const linkClass = clsx('nav-link', isXSmall ? 'text-xs' : 'text-sm');

	return (
		<Col cols="12 md-3 lg-2">
			<div className={clsx(
				'd-flex flex-column',
				isXSmall ? 'px-2' : 'ps-3'
			)}>
				<h4 className="mt-2">LEGAL</h4>
				<nav className={clsx(
					"h-100 flex-column align-items-stretch",
					isXSmall ? "border-bottom  pb-3" : "border-end pe-4"
				)}>
					<nav className="nav nav-pills flex-column">
						<Link
							to="/legal/terms-of-use"
							className={clsx(linkClass, activePage === 'terms' && ' active')}
						>
							Terms of Use
						</Link>
						<Link
							to="/legal/privacy-policy"
							className={clsx(linkClass, activePage === 'privacy' && ' active')}
						>
							Privacy Policy
						</Link>
						<Link
							to="/"
							className={linkClass}
						>
							Home
						</Link>
					</nav>
				</nav>
			</div>
		</Col>
	)
}

export default Navigation
