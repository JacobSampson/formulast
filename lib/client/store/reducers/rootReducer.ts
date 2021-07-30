import { combineReducers } from 'redux';
import gridReducer from './gridReducer';
import viewReducer from './viewReducer';

export const rootReducer = combineReducers({
    grid: gridReducer,
    view: viewReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
