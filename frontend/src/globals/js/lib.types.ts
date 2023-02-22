export interface Formatter {
	num: number;
	dec?: number;
	key?: string;
}

export interface Currency extends Formatter {
	type: string;
}

export type Country = {
	inf: string;
	curID: string;
}

export type FormattedObject = {
	class: string;
	value: string;
}

export interface IMonth {
	idx: number;
	dig: string;
	full: string;
	abrev: string;
}
