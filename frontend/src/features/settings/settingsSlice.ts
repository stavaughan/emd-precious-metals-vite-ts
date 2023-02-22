import { httpRequests } from '@/utils'
import { createSlice, createAsyncThunk, CaseReducer } from '@reduxjs/toolkit'
import { featuresLogic } from '..'
import type { SettingsResponseData } from './settings.types'
import { SettingsState } from './settings.reducer'
import type { ReqData } from '@/utils/data.utils'
import type { AxiosError } from '../features-error.types'

const { createField, getPublicItem, deleteField, updateValue } = httpRequests
const { caseState, errorMessage } = featuresLogic

const initialState: SettingsState = {
	settings: {},
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	message: '',
}

const API_URL = '/api/app-settings/'

export const createSettingField = createAsyncThunk(
	'setting/create',
	async (reqData: ReqData, thunkAPI) => {
		try {
			return await createField(API_URL, reqData) as SettingsResponseData
		} catch (error) {
			const message = errorMessage(error as AxiosError, 'create Setting Field')
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const getSettings = createAsyncThunk(
	'setting/getAll',
	async (_, thunkAPI) => {
		try {
			const settings = await getPublicItem(API_URL)
			return settings
		} catch (error) {
			const message = errorMessage(error as AxiosError, 'get settings')
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const deleteSettingData = createAsyncThunk(
	'setting/delete',
	async (fieldKey: string, thunkAPI) => {
		try {
			const settings = await deleteField(API_URL, fieldKey)
			return settings
		} catch (error) {
			const message = errorMessage(error as AxiosError, 'delete settings field')
			return thunkAPI.rejectWithValue(message)
		}
	}
)

export const updateSettings = createAsyncThunk(
	'setting/update',
	async (reqData: ReqData, thunkAPI) => {
		try {
			const settings = await updateValue(API_URL, reqData)
			return settings
		} catch (error) {
			const message = errorMessage(error as AxiosError, 'update settings')
			return thunkAPI.rejectWithValue(message)
		}
	}
);

export const settingsSlice = createSlice({
	name: 'setting',
	initialState,
	reducers: {
		reset: caseState.reset('settings', null) as unknown as CaseReducer<SettingsState, {
			payload: unknown;
			type: string;
		}>,
	},
	extraReducers: (builder) => {
		builder
			.addCase(createSettingField.pending, (state) => {
				return state = {
					...state,
					isLoading: true,
					isSuccess: false,
					isError: false,
				} as SettingsState
			})
			.addCase(createSettingField.fulfilled, (state, action) => {
				return state = {
					...state,
					settings: action.payload,
					isLoading: false,
					isError: false,
					isSuccess: true,
					message: ''
				} as SettingsState
			})
			.addCase(createSettingField.rejected, (state, action) => {
				return state = {
					...state,
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.payload
				} as SettingsState
			})
			.addCase(getSettings.pending, (state) => {
				return state = {
					...state,
					isLoading: true,
					isSuccess: false,
					isError: false,
				} as SettingsState
			})
			.addCase(getSettings.fulfilled, (state, action) => {
				return state = {
					...state,
					settings: action.payload,
					isLoading: false,
					isError: false,
					isSuccess: true,
					message: ''
				} as SettingsState
			})
			.addCase(getSettings.rejected, (state, action) => {
				return state = {
					...state,
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.payload
				} as SettingsState
			})
			.addCase(deleteSettingData.pending, (state) => {
				return state = {
					...state,
					isLoading: true,
					isSuccess: false,
					isError: false,
				} as SettingsState
			})
			.addCase(deleteSettingData.fulfilled, (state, action) => {
				return state = {
					...state,
					settings: action.payload,
					isLoading: false,
					isError: false,
					isSuccess: true,
					message: ''
				} as SettingsState
			})
			.addCase(deleteSettingData.rejected, (state, action) => {
				return state = {
					...state,
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.payload
				} as SettingsState
			})
			.addCase(updateSettings.pending, (state) => {
				return state = {
					...state,
					isLoading: true,
					isSuccess: false,
					isError: false,
				} as SettingsState
			})
			.addCase(updateSettings.fulfilled, (state, action) => {
				return state = {
					...state,
					settings: action.payload,
					isLoading: false,
					isError: false,
					isSuccess: true,
					message: ''
				} as SettingsState
			})
			.addCase(updateSettings.rejected, (state, action) => {
				return state = {
					...state,
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.payload
				} as SettingsState
			})
	},
})

export const { reset: resetSettings } = settingsSlice.actions
export default settingsSlice.reducer
