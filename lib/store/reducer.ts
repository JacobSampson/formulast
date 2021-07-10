import { Reducer } from "react";
import { combineReducers } from "redux";
import { StateType } from "typesafe-actions";
import { RootAction } from "./constants";
import { gridReducer, viewReducer } from "./reducers";

export const rootReducer = combineReducers({
    grid: gridReducer,
    view: viewReducer
});

export type RootState = StateType<typeof rootReducer>;
