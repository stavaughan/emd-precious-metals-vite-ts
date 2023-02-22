import { configureStore } from '@reduxjs/toolkit';
import type { Reducer } from '@reduxjs/toolkit'
import rootReducer from './rootReducer';

const store = configureStore({
	reducer: rootReducer as Reducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
