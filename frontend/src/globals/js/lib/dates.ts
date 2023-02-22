import type { IMonth } from '../lib.types'

const dates: { daysInMonth: string[], monthArray: IMonth[] } = {

	daysInMonth: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'],

	monthArray: [
		{
			idx: 0,
			dig: "01",
			full: "January",
			abrev: "Jan"
		},
		{
			idx: 1,
			dig: "02",
			full: "February",
			abrev: "Feb"
		},
		{
			idx: 2,
			dig: "03",
			full: "March",
			abrev: "Mar"
		},
		{
			idx: 3,
			dig: "04",
			full: "April",
			abrev: "Apr"
		},
		{
			idx: 4,
			dig: "05",
			full: "May",
			abrev: "May"
		},
		{
			idx: 5,
			dig: "06",
			full: "June",
			abrev: "Jun"
		},
		{
			idx: 6,
			dig: "07",
			full: "July",
			abrev: "Jul"
		},
		{
			idx: 7,
			dig: "08",
			full: "August",
			abrev: "Aug"
		},
		{
			idx: 8,
			dig: "09",
			full: "September",
			abrev: "Sep"
		},
		{
			idx: 9,
			dig: "10",
			full: "October",
			abrev: "Oct"
		},
		{
			idx: 10,
			dig: "11",
			full: "November",
			abrev: "Nov"
		},
		{
			idx: 11,
			dig: "12",
			full: "December",
			abrev: "Dec"
		}
	]
}

export default dates
