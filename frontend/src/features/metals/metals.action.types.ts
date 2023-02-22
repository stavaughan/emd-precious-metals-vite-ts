import { createAction, Action, ActionWithPayload, withMatcher } from '../reducer.utils';
import { METALS_ACTION_TYPES, METALPRICES_ACTION_TYPES, MetalItem, MetalsResponseData } from './metals.types';

// Metals Action Types
export type FetchMetalsStart = Action<METALS_ACTION_TYPES.FETCH_METALS_PENDING>;

export type FetchMetalsSuccess = ActionWithPayload<METALS_ACTION_TYPES.FETCH_METALS_FULFILLED, MetalItem[]>;

export type FetchMetalsFailure = ActionWithPayload<METALS_ACTION_TYPES.FETCH_METALS_REJECTED, Error>;

export type MetalsAction =
	| FetchMetalsStart
	| FetchMetalsSuccess
	| FetchMetalsFailure;

// MetalPrices Action Types
export type FetchMetalPricesStart = Action<METALPRICES_ACTION_TYPES.FETCH_METALPRICES_PENDING>;

export type FetchMetalPricesSuccess = ActionWithPayload<METALPRICES_ACTION_TYPES.FETCH_METALPRICES_FULFILLED, MetalsResponseData>;

export type FetchMetalPricesFailure = ActionWithPayload<METALPRICES_ACTION_TYPES.FETCH_METALPRICES_REJECTED, Error>;

export type MetalPricesAction =
	| FetchMetalPricesStart
	| FetchMetalPricesSuccess
	| FetchMetalPricesFailure;

// Metals Action Creators
export const fetchMetalsStart = withMatcher(
	(): FetchMetalsStart =>
		createAction(METALS_ACTION_TYPES.FETCH_METALS_PENDING)
);

export const fetchMetalsSuccess = withMatcher(
	(metals: MetalItem[]): FetchMetalsSuccess =>
	createAction(METALS_ACTION_TYPES.FETCH_METALS_FULFILLED, metals)
);

export const fetchMetalsFailure = withMatcher(
	(error: Error): FetchMetalsFailure =>
	createAction(METALS_ACTION_TYPES.FETCH_METALS_REJECTED, error)
);

// MetalPrices Action Creators
export const fetchMetalPricesStart = withMatcher(
	(): FetchMetalPricesStart =>
	createAction(METALPRICES_ACTION_TYPES.FETCH_METALPRICES_PENDING)
);

export const fetchMetalPricesSuccess = withMatcher(
	(metalPrices: MetalsResponseData): FetchMetalPricesSuccess =>
	createAction(METALPRICES_ACTION_TYPES.FETCH_METALPRICES_FULFILLED, metalPrices)
);

export const fetchMetalPricesFailure = withMatcher(
	(error: Error): FetchMetalPricesFailure =>
	createAction(METALPRICES_ACTION_TYPES.FETCH_METALPRICES_REJECTED, error)
);
