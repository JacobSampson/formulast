import { InputType } from "../../components/CellInput";
import { CellModel } from "../models/cell";
import { FunctionMeta } from "../models/function";

export type GridState = {
    cells: CellModel[][];
    scope: Object;
    meta: FunctionMeta;
};

export type GridAction = {
    type: string;
    value: any;
};

export type DispatchType = (args: GridAction) => GridAction;

export const UPDATE_CELL_VALUE = 'UPDATE_CELL_VALUE';
export const UPDATE_CELL_TYPE = 'UPDATE_CELL_TYPE';
export const LOAD_CELL_VALUES = 'LOAD_CELL_VALUES';
export const LOAD_FUNCTION = 'LOAD_FUNCTION';

export const updateCellValue = (tag: string, value: string | number) => {
    return (dispatch: DispatchType) => dispatch({
        type: UPDATE_CELL_VALUE,
        value: {
            tag,
            value
        }
    });
};

export const updateCellType = (tag: string, type: InputType) => {
    return (dispatch: DispatchType) => dispatch({
        type: UPDATE_CELL_TYPE,
        value: {
            tag,
            type
        }
    });
};

export const loadCellValues = (cells: CellModel[][]) => {
    return (dispatch: DispatchType) => dispatch({
        type: LOAD_CELL_VALUES,
        value: cells
    });
};

export const loadFunction = (cells: CellModel[][], meta: FunctionMeta) => {
    return (dispatch: DispatchType) => dispatch({
        type: LOAD_FUNCTION,
        value: {
            cells,
            meta
        }
    })
}
