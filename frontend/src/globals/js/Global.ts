import { dates } from './lib';
import type { IMonth } from './lib.types'

const Global = {

	_Date: {

		// Format type === 'full': December 16, 2020
		// Format type === 'abrev': Dec 16, 2020
		formatted(date: string, type: 'full' | 'abrev' = 'full') {
			const newDate = date ? new Date(date) : new Date();
			const month = newDate.getMonth();
			const monthObj = dates.monthArray.find(imonth => imonth.idx === month) as IMonth;
			const formattedMonth = monthObj !== undefined ? monthObj[type] : '';
			return `${formattedMonth} ${newDate.getDate()}, ${newDate.getFullYear()}`;
		},
	},

	upperCaseFirst: (value: string) => {
		if (typeof value !== 'string') {
			return ''
		}
		return value.split(' ').map(_ => _.charAt(0).toUpperCase() + _.slice(1)).join(' ');
	},

	sumAll: (data: number[]) => data.reduce((a, b) => a + b, 0),

	isLast: (items: unknown[], idx: number) => (items.length - 1) === idx,

	propTotal: (
		data: object[],
		prop: string,
		nProp?: keyof typeof data[0][keyof typeof data[0]]
	): number => {
		if(!data?.length) return 0;
		return data
			.map(_ => nProp
				? _[prop as keyof typeof data[0]][nProp]
				: _[prop as keyof typeof data[0]])
			.reduce((a, b) => a + b, 0)
	},

	// will return a number from numbers pulled out of input text string (integers only)
	numbersOnly: (value: number | string | '') => {
		if(typeof value === 'number') return value;
		const numValue = value.trim();
		if(!numValue) return;
		const nums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
		const numericalCharacters = numValue.split('').filter(_ => nums.includes(_)).join('');
		return Number(numericalCharacters)
	},

	// will return a string representing only numbers from the input parameter if all of the characters are numbers or return an empty string
	allNumberCharacters: (value: string | number) => {
		if(typeof value === 'number') return value;
		const textValue: string = value.trim();
		const returnValue: string = (!isNaN(Number(textValue))) ? textValue : '';
		return returnValue;
	},

	counter: ((incr = 1, start) => {
		let count = start || 0;
		return () => count += incr;
	})(),

	getObjectID: () => {
		const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
		return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
			return (Math.random() * 16 | 0).toString(16);
		}).toLowerCase();
	},

	generateUUIDs: (count: number) => {
		if(!count) return [];
		return Array(count).fill(Global.getObjectID());
	},

	removeDuplicates: (arr: string[]) => {
		if(!arr?.length) return [];
		return arr.filter((item, idx) => arr.indexOf(item) === idx)
	},

	objectIDsGenerator: (count: number) => {
		const generatedIds: string[] = Global.generateUUIDs(count);
		return Global.removeDuplicates(generatedIds);
	},

	formatNumber: (value: number | string, decimals: number = 2) => {
		if(!value) return;
		const num = Number(value);
		if(isNaN(num)) return;
		return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
	}
};

export default Global;
