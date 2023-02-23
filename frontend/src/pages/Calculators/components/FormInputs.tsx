import { GroupInputRow, InputCol } from '@/components/Forms/components';
import { MetalsContext } from '@/contexts';
import type { InputValues, MetalsContextType } from '@/contexts/metals-context.types';
import { Global } from '@/globals/js';
import { preciousMetals } from '@/globals/js/lib';
import type { MetalQuality } from '@contexts/metals-context.types';
import React, { useCallback, useContext, useMemo } from 'react';

const FormInputs: React.FC = () => {

	const {
		inputValues,
		setInputValues,
		dropDownOptions
	} = useContext(MetalsContext) as MetalsContextType;

	const ddOptions = dropDownOptions(inputValues as InputValues);

	const allQualities = useMemo(() => {
		const allQuals = ['gold', 'silver', 'platinum']
			.map(metal => preciousMetals.filter(_ => _.metal === metal));
		return allQuals.flat();
	}, []);

	const onSelectMetal = (value: string) => setInputValues((prev) => ({
		...prev,
		metal: value.toLowerCase(),
	} as InputValues));

	const qualitiesObject = useCallback((value: string) => {
		if (!value) return null;
		const qualObj = allQualities.find((qual: { _id: string; }) => qual._id === value);
		return qualObj as MetalQuality;
	}, [allQualities])

	const onSelectQual = useCallback((value: string) => {
		const qualObj = qualitiesObject(value);
		setInputValues((prev) => ({
			...prev,
			quality: value,
			qualityLabel: qualObj !== null ? qualObj.label : '',
			qualityDisplay: qualObj !== null ? qualObj.display : ''
		} as InputValues))
	}, [setInputValues, qualitiesObject]);

	const onSetWeight = (value: string) => {
		const weightVal = Global.numbersOnly(value);

		if (weightVal) {
			setInputValues((prev) => ({
				...prev,
				weight: weightVal * 1000,
				weightLabel: value
			} as InputValues))
		}
	};

	return (
		<GroupInputRow label="Metal Details">
			<InputCol.Dropdown
				wrapProps={{ cols: '6 sm-4 md-3' }}
				selectProps={{
					label: 'Metal',
					id: 'inputmetaltype',
					options: ddOptions?.metal,
					onChange: onSelectMetal,
					selected: inputValues?.metal,
					isRequired: true
				}}
			/>
			<InputCol.Dropdown
				wrapProps={{ cols: '6 sm-4 md-3' }}
				selectProps={{
					label: inputValues?.metal !== undefined ? `${Global.upperCaseFirst(inputValues?.metal)} Quality'` : 'Quality',
					id: 'inputmetalqual',
					options: ddOptions?.quality,
					onChange: onSelectQual,
					selected: inputValues?.quality || '',
					isRequired: true
				}}
			/>
			<InputCol.Text
				wrapProps={{ cols: '6 sm-4 md-3' }}
				textInputProps={{
					id: "inputmetalweight",
					label: inputValues?.metal !== undefined ? `${Global.upperCaseFirst(inputValues.metal)} Weight (grams)` : 'Weight (grams)',
					value: inputValues?.weightLabel || '',
					onChange: onSetWeight,
					required: true
				}}
			/>
		</GroupInputRow>
	)
}

export default FormInputs
