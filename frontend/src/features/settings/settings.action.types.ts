import { createAction, Action, ActionWithPayload } from '../reducer.utils';
import { SETTINGS_ACTION_TYPES, Settings } from './settings.types';

// Settings Action Types
export type FetchSettingsStart = Action<SETTINGS_ACTION_TYPES.FETCH_SETTINGS_PENDING>;
export type FetchSettingsSuccess = ActionWithPayload<SETTINGS_ACTION_TYPES.FETCH_SETTINGS_FULFILLED, Settings>;
export type FetchSettingsFailure = ActionWithPayload<SETTINGS_ACTION_TYPES.FETCH_SETTINGS_REJECTED, Error>;
export type SettingsAction = FetchSettingsStart | FetchSettingsSuccess | FetchSettingsFailure;

// Settings Action Creators
export const fetchSettingsStart = (): FetchSettingsStart => createAction(SETTINGS_ACTION_TYPES.FETCH_SETTINGS_PENDING);
export const fetchSettingsSuccess = (settings: Settings): FetchSettingsSuccess => createAction(SETTINGS_ACTION_TYPES.FETCH_SETTINGS_FULFILLED, settings);
export const fetchSettingsFailure = (error: Error): FetchSettingsFailure => createAction(SETTINGS_ACTION_TYPES.FETCH_SETTINGS_REJECTED, error);
