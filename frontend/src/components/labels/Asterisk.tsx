import React from 'react'
import clsx from "clsx";
import type { AsteriskProps } from './labels.types';

const Asterisk: React.FC<AsteriskProps> = (props) => (
	<span className={clsx('text-info text-xs', props.className)}>
		{props.symbol}
	</span>
);

export default Asterisk
