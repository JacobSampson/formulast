import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CellModel } from "../../../core";

export type ViewMode = 'edit' | 'view' | 'create';

export type ViewState = {
    mode: ViewMode,
    activeCell?: CellModel
}

const initialState: ViewState = {
    mode: 'view',
    // activeCell
};

const view = createSlice({
    name: 'view',
    initialState,
    reducers: {
        setViewState(state, { payload }: PayloadAction<{ mode: ViewMode }>) {
            const { mode } = payload;
            return {
                ...state,
                mode
            };
        },
        setActiveCell(state, { payload }:PayloadAction<{ cell: CellModel }>) {
            const { cell } = payload;

            return {
                ...state,
                activeCell: cell
            }    
        }
    }
});

export const {
    setViewState,
    setActiveCell
} = view.actions;
export default view.reducer;
