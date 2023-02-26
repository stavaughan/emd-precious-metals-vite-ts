import type { StatusState } from '../features.types'

export enum SETTINGS_ACTION_TYPES {
	FETCH_SETTINGS_PENDING = 'setting/FETCH_SETTINGS_PENDING',
	FETCH_SETTINGS_FULFILLED = 'setting/FETCH_SETTINGS_FULFILLED',
	FETCH_SETTINGS_REJECTED = 'setting/FETCH_SETTINGS_REJECTED',
}

export type MarkType = 'registered' | 'trademark' | undefined;

type Developer = {
	name?: string;
	subName?: string;
	url?: string;
};

type SiteBranding = {
	brand?: string;
	mark?: MarkType;
	logo?: string;
};

type Social = {
	media?: string;
	url?: string;
	profileName?: string;
	accountLink?: string;
} | null;

type CopyRight = {
	link?: string;
	label?: string;
}

export type SiteInfo = {
	name?: string;
	siteName?: string;
	description?: string;
	businessName?: string;
	streetAddress?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	phone?: string;
	email?: string;
	website?: string;
	date?: string;
}

export interface Settings {
	_id: string;
	siteName: string;
	copyRight: CopyRight;
	siteBranding: SiteBranding;
	social: Social[] | [];
	developer: Developer;
	siteData?: object;
	siteInfo?: SiteInfo;
}

export interface SettingsData {
	settings?: Settings;
}

export interface SettingsResponseData {
	settingsRes: SettingsData;
}

export interface SettingsState extends StatusState, SettingsData { }
