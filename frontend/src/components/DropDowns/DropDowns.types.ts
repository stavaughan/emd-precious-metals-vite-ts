import type { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface IconDropDownProps {
	setOption: (option: string) => void;
	options: string[];
	icon: IconProp;
	margin?: string;
}
