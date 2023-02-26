import { useMemo, useCallback } from 'react';
import { controlProps } from '@/globals/js';

const WebSiteLink: React.FC<{
	url: string;
	shortLabel?: string;
	className?: string;
	length?: number;
}> = ({ url, shortLabel, className, length }) => {

	const shortUrl = useCallback((
		url: string,
		label?: string,
		length: number = 55
	) => {
		const urlLabel = url.replace('https://', '');
		const lengthTest = (urlLabel.length > (length * .5) && window.width < 600) || urlLabel.length > length;
		return lengthTest ? label : urlLabel;
	}, []);

	const siteName = useMemo(() => shortUrl(url, shortLabel, length), [url, shortLabel, length, shortUrl]);

    return (
        <a
            className={className || ''}
            {...controlProps.newTab(url)}
			role="button"
        >
            {siteName}
        </a>
    );
};

export default WebSiteLink;
