import { Action } from 'redux';
import type { SerializedError } from '@reduxjs/toolkit'

type DataType = object | object[] | string;
type MessageType = string;
type ErrorType = boolean;
type SuccessType = boolean;
type LoadingType = boolean;

export interface StatusState {
	isError?: ErrorType;
	isSuccess?: SuccessType;
	isLoading?: LoadingType;
	message?: MessageType;
}

export interface PayloadAction extends Action {
	payload?: DataType;
}

export interface PendingAction<ThunkArg> {
	type: string
	payload: undefined
	meta: {
		requestId: string
		arg: ThunkArg
	}
}

export interface FulfilledAction<ThunkArg, PromiseResult> {
	type: string
	payload: PromiseResult
	meta: {
		requestId: string
		arg: ThunkArg
	}
}

export interface RejectedAction<ThunkArg> {
	type: string
	payload: undefined
	error?: SerializedError
	meta: {
		requestId: string
		arg: ThunkArg
		aborted: boolean
		condition: boolean
	}
}

export interface RejectedWithValueAction<ThunkArg, RejectedValue> {
	type: string
	payload: RejectedValue
	error: { message: 'Rejected' }
	meta: {
		requestId: string
		arg: ThunkArg
		aborted: boolean
	}
}

export type Pending = <ThunkArg>(
	requestId: string,
	arg: ThunkArg
) => PendingAction<ThunkArg>

export type Fulfilled = <ThunkArg, PromiseResult>(
	payload: PromiseResult,
	requestId: string,
	arg: ThunkArg
) => FulfilledAction<ThunkArg, PromiseResult>

export type Rejected = <ThunkArg>(
	requestId: string,
	arg: ThunkArg
) => RejectedAction<ThunkArg>

export type RejectedWithValue = <ThunkArg, RejectedValue>(
	requestId: string,
	arg: ThunkArg
) => RejectedWithValueAction<ThunkArg, RejectedValue>

// Action Creators and Reducers Types
export type ActionCreator = (data: DataType) => PayloadAction;

// Reducer Types
export type ReducerState = StatusState & { [key: string]: DataType };

// Reducer Builder Types
export type ActionReducerMapBuilder = {
	addCase: (
		action: ActionCreator,
		reducer: (state: ReducerState, action: PayloadAction) => void
	) => void;
};

export type ReturnState = (state: StatusState, action: PayloadAction ) => void

export type EmptyData = [] | null | undefined | '';
