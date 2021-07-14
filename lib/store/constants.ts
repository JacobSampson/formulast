import { CellModel } from "../models";
import { FormulaMeta } from "../models/formula";

/**
 * GRID
 */

export type GridState = {
    cells: CellModel[][];
    scope: Object;
    meta: FormulaMeta;
};

export type GridAction = {
    type: string;
    payload: any;
};

export const UPDATE_CELL_VALUE = 'UPDATE_CELL_VALUE';
export const UPDATE_CELL_META = 'UPDATE_CELL_META';
export const LOAD_CELL_VALUES = 'LOAD_CELL_VALUES';
export const LOAD_FORMULA = 'LOAD_FORMULA';
export const UPDATE_SIZE = 'UPDATE_SIZE';
export const DELETE_CELL = 'DELETE_CELL';
export const UPDATE_FORMULA_META = 'UPDATE_FORMULA_META';

/**
 * VIEW
 */

export type ViewAction = {
    type: string;
    payload: any;
}

export type ViewMode = 'edit' | 'view' | 'create';

export type ViewState = {
    mode: ViewMode,
    activeCell?: CellModel
}

export const SET_VIEW_STATE = 'SET_VIEW_STATE';
export const SET_ACTIVE_CELL = 'SET_ACTIVE_CELL';

/**
 * ROOT
 */

export type RootAction = GridAction | ViewAction;
