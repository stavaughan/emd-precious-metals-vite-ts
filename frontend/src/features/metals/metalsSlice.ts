import { httpRequests } from '@/utils'
import { CaseReducer, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { featuresLogic } from '..'
import type { MetalsResponseData, SelMetals } from './metals.types'
import { MetalPricesState } from './metals.reducer'
import type { AxiosError } from '../features-error.types'

const { getMetalsData } = httpRequests
const { caseState, errorMessage } = featuresLogic

const initialState: MetalPricesState = {
	metalsRes: {},
	isLoading: false,
	isSuccess: false,
	isError: false,
	error: null,
	message: '',
}

const API_URL = '/api/metals'

export const getMetals = createAsyncThunk(
	'metal/getMetals',
	async (selMetals: SelMetals, thunkAPI): Promise<MetalsResponseData> => {
		try {
			return await getMetalsData(API_URL, selMetals)
		} catch (error) {
			const message = errorMessage(error as AxiosError, API_URL)
			return thunkAPI.rejectWithValue(message) as MetalsResponseData
		}
	}
)

export const metalsSlice = createSlice({
	name: 'metal',
	initialState,
	reducers: {
		resetMetals: caseState.reset('metals', []) as unknown as CaseReducer<MetalPricesState, { payload: unknown; type: string; }>,
		resetPrices: caseState.reset('metalsRes', null) as unknown as CaseReducer<MetalPricesState, { payload: unknown; type: string; }>,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getMetals.pending, (state) => {
				return state = {
					...state,
					isLoading: true,
					isSuccess: false,
					isError: false,
				} as MetalPricesState
			})
			.addCase(getMetals.fulfilled, (state, action) => {
				return state = {
					...state,
					metalsRes: action.payload,
					isLoading: false,
					isError: action.payload?.error !== null,
					isSuccess: action.payload?.success === true,
					message: action.payload?.error !== null
						? action.payload?.error?.info
						: ''
				} as MetalPricesState
			})
			.addCase(getMetals.rejected, (state, action) => {
				return state = {
					...state,
					isLoading: false,
					isSuccess: false,
					isError: true,
					message: action.payload
				} as MetalPricesState
			})
	},
})

export const { resetPrices, } = metalsSlice.actions

export default metalsSlice.reducer
