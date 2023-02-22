import type { AspectRatio } from '../image-transformation.types';

const aspectRatios = (base: number) => ([
	{
		_id: 'ratio_1_1',
		label: '1:1 square',
		width: base,
		height: base,
		value: 1 / 1
	},
	{
		_id: 'ratio_5_4',
		label: '5:4 landscape',
		height: base,
		width: base * 5 / 4,
		value: 5 / 4
	},
	{
		_id: 'ratio_4_5',
		label: '4:5 portrait',
		width: base,
		height: base * 5 / 4,
		value: 4 / 5
	},
	{
		_id: 'ratio_3_2',
		label: '3:2 landscape',
		height: base,
		width: base * 3 / 2,
		value: 3 / 2
	},
	{
		_id: 'ratio_2_3',
		label: '2:3 portrait',
		width: base,
		height: base * 3 / 2,
		value: 2 / 3
	},
	{
		_id: 'ratio_16_9',
		label: '16:9 landscape',
		height: base,
		width: base * 16 / 9,
		value: 16 / 9
	},
	{
		_id: 'ratio_9_16',
		label: '9:16 portrait',
		width: base,
		height: base * 16 / 9,
		value: 9 / 16
	}
] as AspectRatio[]);

export default aspectRatios;
