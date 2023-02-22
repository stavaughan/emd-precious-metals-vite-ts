import {
	METALS_ACTION_TYPES,
	METALPRICES_ACTION_TYPES,
	MetalItem,
	//MetalPricesData,
	MetalsResponseData,
} from './metals.types';
import { MetalsAction, MetalPricesAction } from './metals.action.types';

// Metals Data from Browser Storage API
export type MetalsState = {
	readonly metals: MetalItem[];
	readonly isLoading: boolean;
	readonly isSuccess: boolean;
	readonly isError: boolean;
	readonly error: Error | null;
	readonly message: string;
}

// Metals Data fetched from Metals API
export type MetalPricesState = {
	readonly metalsRes: MetalsResponseData;
	readonly isLoading: boolean;
	readonly isSuccess: boolean;
	readonly isError: boolean;
	readonly error: Error | null;
	readonly message: string;
}

export const METALS_INITIAL_STATE: MetalsState = {
	metals: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	message: '',
};

export const METALPRICES_INITIAL_STATE: MetalPricesState = {
	metalsRes: {},
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	message: '',
};

export const metalsReducer = (
	state = METALS_INITIAL_STATE,
	action = {} as MetalsAction
) => {
	switch (action.type) {
		case METALS_ACTION_TYPES.FETCH_METALS_PENDING:
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				isError: false,
			};
		case METALS_ACTION_TYPES.FETCH_METALS_FULFILLED:
			return {
				...state,
				metals: action.payload,
				isLoading: false,
				isError: false,
				isSuccess: true,
			};
		case METALS_ACTION_TYPES.FETCH_METALS_REJECTED:
			return {
				...state,
				error: action.payload,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.payload,
			};
		default:
			return state;
	}
};

export const metalPricesReducer = (
	state = METALPRICES_INITIAL_STATE,
	action = {} as MetalPricesAction
) => {
	switch (action.type) {
		case METALPRICES_ACTION_TYPES.FETCH_METALPRICES_PENDING:
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				isError: false,
				message: '',
			};
		case METALPRICES_ACTION_TYPES.FETCH_METALPRICES_FULFILLED:
			return {
				...state,
				metalsRes: action.payload,
				isLoading: false,
				isError: action.payload?.error !== null,
				isSuccess: action.payload?.success === true,
				message: action.payload?.error !== null
					? action.payload?.error?.info
					: ''
			};
		case METALPRICES_ACTION_TYPES.FETCH_METALPRICES_REJECTED:
			return {
				...state,
				error: action.payload,
				isLoading: false,
				isSuccess: false,
				isError: true,
				message: action.payload
			};
		default:
			return state;
	}
}
