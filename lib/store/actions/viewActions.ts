import { action } from "typesafe-actions";
import { CellModel } from "../../models";
import { SET_ACTIVE_CELL, SET_VIEW_STATE, ViewMode, ViewState } from "../constants";

export const setViewState = (mode: ViewMode) => action(SET_VIEW_STATE, { mode });
export const setActiveCell = (cell: CellModel) => action(SET_ACTIVE_CELL, { cell });
