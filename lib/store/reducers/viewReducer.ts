import { createReducer } from "typesafe-actions";
import { setViewState } from "../actions";
import { SET_VIEW_STATE, ViewAction, ViewState } from "../constants";

export const defaultViewState: ViewState = {
    mode: 'view'
};

export const viewReducer = createReducer<ViewState, ViewAction>(defaultViewState)
    .handleType(SET_VIEW_STATE, (_, { payload }) => {
        const { mode } = payload;
        return { mode };
    });
