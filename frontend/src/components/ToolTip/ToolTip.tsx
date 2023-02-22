import React from 'react'
import { useMobile } from '@/hooks';
import { usePopperTooltip } from 'react-popper-tooltip';
import 'react-popper-tooltip/dist/styles.css';

type Props = {
	tip: JSX.Element | string;
	span?: boolean;
	width?: number;
	interactive?: boolean;
	children: React.ReactNode;
}

const ToolTip: React.FC<Props> = ({
	tip,
	span,
	width,
	interactive,
	children
}) => {

	const { isXSmall } = useMobile();

	const {
		getArrowProps,
		getTooltipProps,
		setTooltipRef,
		setTriggerRef,
		visible,
	} = usePopperTooltip({
		placement: 'top',
		closeOnTriggerHidden: false,
		interactive: interactive || false,
		delayHide: 70
	});

	const toolTipStyle = {
		zIndex: 1100,
		'--tooltipBackground': 'var(--slate-800)',
		backgroundColor: "var(--tooltipBackground)",
		opacity: "0.9",
		borderRadius: "5px",
		border: '1px solid var(--tooltipBackground)',
		fontSize: '.775rem',
		color: "var(--slate-50)",
		padding: '0.53rem',
		boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.18)',
		...width && { width }
	}

	if (isXSmall) {
		return <>{children}</>
	}

	return (
		<>
			{span
				? <span ref={setTriggerRef}>{children}</span>
				: <div ref={setTriggerRef}>{children}</div>}
			{visible && (
				<div
					ref={setTooltipRef}
					{...getTooltipProps({
						className: 'tooltip-container',
						style: toolTipStyle
					})}
				>
					{tip}
					<div {...getArrowProps({
						className: 'tooltip-arrow',
						'data-popper-arrow': true
					})} />
				</div>
			)}
		</>
	)
}

export default ToolTip
