import React from 'react'
import { ToolTip } from '@/components/ToolTip';
import clsx from 'clsx';
import { FontAwesomeIcon as FAIcon } from '@fortawesome/react-fontawesome';
import type { InfoAlertProps } from './Alerts.types';

const InfoAlert: React.FC<InfoAlertProps> = ({
	message,
	question,
	style,
	className,
	interactive,
	width,
}) => {

	return (
		<ToolTip
			tip={message}
			width={width || 300}
			interactive={interactive}
			span={true}
		>
			<FAIcon
				icon={question ? "question-circle" : "info-circle"}
				className={clsx("text-info", className)}
				{...style && { style }}
			/>
		</ToolTip>
	)
}

export default InfoAlert
