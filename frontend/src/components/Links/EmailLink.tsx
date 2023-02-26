import { useMemo, useCallback } from 'react';
import clsx from 'clsx';

declare global {
	interface Window {
		width: number;
	}
}

const EmailLink: React.FC<{
	email: string;
	size?: string;
	isXSmall?: boolean;
}> = ({ email, size, isXSmall }) => {

	const shortEmail = useCallback((email: string, length: number) => {
		const lengthTest = (email.length > (length * .5) && window.width < 600) || email.length > length;
		return lengthTest ? 'Click for email' : email;
	}, []);

	const label = useMemo(() => shortEmail(email, 55), [email, shortEmail]);

    return (
        <a href={`mailto:${email}`} className={clsx(
			size || (isXSmall ? 'text-xs' : 'text-sm'),
			"text-nowrap"
		)}>
            {label}
        </a>
    );
};

export default EmailLink;
