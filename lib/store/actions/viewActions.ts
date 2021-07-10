import { action } from "typesafe-actions";
import { SET_VIEW_STATE, ViewMode, ViewState } from "../constants";

export const setViewState = (mode: ViewMode) => action(SET_VIEW_STATE, { mode });
