import { createSelector } from '@reduxjs/toolkit'
import {
	MetalPricesState,
	//MetalsState
} from './metals.reducer';
//import { MetalsMap } from './metals.types';
import { RootState } from '@/app/rootReducer';

const selectMetalPricesReducer = (state: RootState): MetalPricesState => state?.metal;
// const selectMetalsReducer = (state: RootState): MetalsState => state?.metals;

export const selectMetalPrices = createSelector(
    [selectMetalPricesReducer],
	(metalsRes) => metalsRes.metalsRes
);

// export const selectMetals = createSelector(
// 	[selectMetalsReducer],
// 	(metals) => metals.metals
// );

// export const selectMetalsMap = createSelector(
// 	[selectMetals],
// 	(metals): MetalsMap => metals.reduce((acc, metal) => {
// 		const metalID = metal?.metalID;
// 		const existingMetal = metal?.metalID ? acc[metalID as keyof typeof acc] : null;

// 		if (existingMetal) {
// 			return { ...acc, [metalID as keyof typeof acc]: [...existingMetal, metal] };
// 		}
// 		return { ...acc, [metalID as keyof typeof acc]: [metal] };
// 	}, {} as MetalsMap)
// );

// export const selectMetalsIsLoading = createSelector(
// 	[selectMetalsReducer],
// 	(metals) => metals.isLoading
// );
