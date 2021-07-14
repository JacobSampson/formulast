import { createReducer } from "typesafe-actions";
import { setViewState } from "../actions";
import { SET_ACTIVE_CELL, SET_VIEW_STATE, ViewAction, ViewState } from "../constants";

export const defaultViewState: ViewState = {
    mode: 'view',
    activeCell: null
};

export const viewReducer = createReducer<ViewState, ViewAction>(defaultViewState)
    .handleType(SET_VIEW_STATE, (state, { payload }) => {
        const { mode } = payload;
        return {
            ...state,
            mode
        };
    }).handleType(SET_ACTIVE_CELL, (state, { payload }) => {
        const { cell } = payload;

        return {
            ...state,
            activeCell: cell
        }
    });
