import { CellModel, CellType } from "../models/cell";

export type GridState = {
    cells: CellModel[][];
};

export type GridAction = {
    type: string;
    tag: string;
    value: string | number;
};

export type DispatchType = (args: GridAction) => GridAction;

export const UPDATE_CELL_VALUE = 'UPDATE_CELL_VALUE';

export const updateCellValue = (tag: string, value: string | number) => {
    return (dispatch: DispatchType) => dispatch({
        type: UPDATE_CELL_VALUE,
        tag,
        value
    });
};
