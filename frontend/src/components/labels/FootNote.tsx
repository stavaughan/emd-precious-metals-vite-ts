import React from 'react'
import type { FootNoteProps } from './labels.types';
import { Asterisk } from '.';

const FootNote = ({ aft = false, children, ...props }: FootNoteProps) => {
	if (aft) return <>{children}<Asterisk {...props} /></>;
	return <><Asterisk {...props} />{children}</>;
};

export default FootNote;
