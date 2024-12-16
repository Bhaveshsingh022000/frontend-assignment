import { combineReducers } from '@reduxjs/toolkit';
import kickStarterProjectsSlice from './kickStarter/reducer';

const rootReducer  = combineReducers({
    [kickStarterProjectsSlice.name]: kickStarterProjectsSlice.reducer
});

export default rootReducer;