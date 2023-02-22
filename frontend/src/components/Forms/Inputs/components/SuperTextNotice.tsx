import React from 'react'
import clsx from 'clsx';
import type { SupNoticeProps } from './input-components.types';

const SuperTextNotice: React.FC<SupNoticeProps> = ({ notice }) => (
	<sup className={clsx(
		'ms-1 text-xs fst-italic font-light',
		notice === 'required' ? 'text-danger' : 'text-muted'
	)}>{notice === 'required' ? '*' : ' (optional)'}</sup>
);

export default SuperTextNotice
