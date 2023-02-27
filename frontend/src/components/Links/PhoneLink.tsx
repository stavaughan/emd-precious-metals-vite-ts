import clsx from 'clsx';
import { useMobile } from '@/hooks';

const PhoneLink: React.FC<{
	phone: string;
	formatted: string;
	extension?: string;
	className?: string;
}> = ({
	phone,
	formatted,
	extension = '',
	className = '',
}) => {

	const { isXSmall } = useMobile();

	const label = formatted + extension ;

	if(!phone) {
		return <>{formatted}</>;
	}

    return (
        <a
            href={`tel:${phone}`}
            className={clsx(
				className,
				isXSmall ? 'text-xxs' : 'text-xs',
				'text-nowrap'
			)}
        >
            {label}
        </a>
    );
};

export default PhoneLink;
