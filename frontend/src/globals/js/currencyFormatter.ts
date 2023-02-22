import { currencyCountryCodes } from './lib';
import type {
	Formatter,
	Currency,
	Country,
	FormattedObject
} from './lib.types';


const formatCurrency = ({ num, dec, type, key }: Currency): string => {

    const country = currencyCountryCodes.find(cur => cur.curID === type);

	const { inf, curID } = country as Country;

	const numberFormat = new Intl.NumberFormat(inf, {
        style: 'currency',
        currency: curID,
        minimumFractionDigits: dec || 0
    });

	const roundedNumber: number = dec === 0 ? Math.round(num) : num;

	const formattedNumber = numberFormat.format(roundedNumber);

    const formattedData = {
        class: formattedNumber.slice(0, 1) === '-' ? 'text-danger' : '',
        value: Math.sign(num) !== -1 ? `${formattedNumber}` : `(${formattedNumber.slice(1)})`
    } as FormattedObject;

	return key === 'value' ? formattedData.value : formattedData.class;
};

const amountUSD = ({num, key = 'value', dec = 0}: Formatter): string => {
    if(isNaN(num)) return ''
    return formatCurrency({ num, dec, type: 'USD', key });
};

export default amountUSD;
