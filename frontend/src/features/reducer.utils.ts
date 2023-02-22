import { AnyAction } from "@reduxjs/toolkit";

// AnyAction is a type that represents any action. It can be used for reducers that don't care about the action type.

type Matchable<AC extends () => AnyAction> = AC & {
	type: ReturnType<AC>["type"];
	match(action: AnyAction): action is ReturnType<AC>;
}

export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// eslint-disable-next-line @typescript-eslint/ban-types
export function withMatcher(actionCreator: Function) {
	const type = actionCreator().type;
	return Object.assign(actionCreator, {
		type,
		match(action: AnyAction) {
			return action.type === type;
		},
	})
}

export type ActionWithPayload<T, P> = {
	type: T;
	payload?: P;
};

export type Action<T> = { type: T; }

export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

export function createAction<T extends string>(type: T, payload: void): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
	return { type, payload };
}
