import { createReducer } from "typesafe-actions";
import { CellInputProps } from "../../../components/CellInput";
import { evaluateExpressions } from "../../core";
import { CellType } from "../../models";
import { alphanumericToIndicies, deepCopy } from "../../util";
import { loadCellValues, loadFormula, updateCellType, updateCellValue } from "../actions";
import { DELETE_CELL, GridAction, GridState, LOAD_CELL_VALUES, LOAD_FORMULA, UPDATE_CELL_TYPE, UPDATE_CELL_VALUE, UPDATE_SIZE } from "../constants";

export const emptyGridState: GridState  = {
    cells: [[]],
    scope: {},
    meta: {
        title: 'Example Description',
        description: 'Describe your sheet snippet here'
    }
};

export const gridReducer = createReducer<GridState, GridAction>(emptyGridState)
    .handleType(LOAD_FORMULA, (state, { payload }) => {
        const { cells, meta } = payload;
        const scope = evaluateExpressions(cells);

        return {
            ...state,
            cells,
            meta,
            scope
        }
    })
    .handleType(UPDATE_CELL_TYPE, (state, { payload }) => {
        const cells = state.cells;

        const { tag, type } = payload;
        const { rowIndex, colIndex } = alphanumericToIndicies(tag);

        const cell = (cells[rowIndex][colIndex].props as CellInputProps);
        cell.type = type;

        return {
            ...state,
            cells
        }
    }).handleType(UPDATE_CELL_VALUE, (state, { payload }) => {
        const cells = state.cells;

        const { tag, value } = payload;
        const { rowIndex, colIndex } = alphanumericToIndicies(tag);

        // Add new cell props if none existed before
        if (!cells[rowIndex][colIndex]) {
            cells[rowIndex][colIndex] = { type: CellType.INPUT, props: {} };
        }

        const cell = (cells[rowIndex][colIndex].props as CellInputProps);
        cell.value = `${value}`;

        const scope = evaluateExpressions(state.cells);

        return {
            ...state,
            cells,
            scope
        };
    }).handleType(LOAD_CELL_VALUES, (state, { payload }) => {
        const { cells } = payload;
        const scope = evaluateExpressions(state.cells);

        return {
            ...state,
            cells,
            scope,
        }
    }).handleType(UPDATE_SIZE, (state, { payload }) => {
        const { width, height } = payload;

        // Ignore invalid requests
        if (height <= 0 || width <= 0) return state;

        const { cells } = state;

        const currHeight = cells.length;
        const currWidth = cells[0].length;

        let updatedCells = deepCopy(cells);
        if (width < currWidth) {
            // Remove columns
            updatedCells = updatedCells.map(row => row.slice(0, -1));
        } else if (width > currWidth) {
            // Add columns
            updatedCells = updatedCells.map(row => [...row, null]);
        } else if (height < currHeight) {
            // Remove row
            updatedCells = updatedCells.slice(0, -1);
        } else if (height > currHeight) {
            // Add Row
            updatedCells = [
                ...updatedCells,
                new Array(width).fill(null)
            ];
        }

        return {
            ...state,
            cells: updatedCells
        }
    }).handleType(DELETE_CELL, (state, { payload }) => {
        const cells = deepCopy(state.cells);

        const { tag } = payload;
        const { rowIndex, colIndex } = alphanumericToIndicies(tag);

        cells[rowIndex][colIndex] = null;
        const scope = evaluateExpressions(cells);
        console.log(state)

        return {
            ...state,
            cells,
            scope
        };
    });
