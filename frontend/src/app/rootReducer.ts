import { combineReducers } from 'redux';
import settingsReducer from '@/features/settings/settingsSlice';
import metalsReducer from '@/features/metals/metalsSlice';

const rootReducer = combineReducers({
    setting: settingsReducer,
	metal: metalsReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
