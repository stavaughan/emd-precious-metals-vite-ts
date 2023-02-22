import { SETTINGS_ACTION_TYPES, SettingsData } from './settings.types';
import { SettingsAction } from './settings.action.types';

export type SettingsState = {
	readonly settings: SettingsData;
	readonly isLoading: boolean;
	readonly isSuccess: boolean;
	readonly isError: boolean;
	readonly error: Error | null;
	readonly message: string;
}

export const SETTINGS_INITIAL_STATE: SettingsState = {
	settings: {},
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	message: '',
};

export const settingsReducer = (
	state = SETTINGS_INITIAL_STATE,
	action = {} as SettingsAction
) => {
	switch (action.type) {
		case SETTINGS_ACTION_TYPES.FETCH_SETTINGS_PENDING:
			return {
				...state,
				isLoading: true,
				isSuccess: false,
				isError: false,
			};
		case SETTINGS_ACTION_TYPES.FETCH_SETTINGS_FULFILLED:
			return {
				...state,
				settings: action.payload,
				isLoading: false,
				isError: false,
				isSuccess: true,
			};
		case SETTINGS_ACTION_TYPES.FETCH_SETTINGS_REJECTED:
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
