import { CellInputProps } from "../../components/CellInput";
import { evaluateExpressions } from "../core";
import { alphanumericToIndicies } from "../util";
import { GridState, GridAction, UPDATE_CELL_VALUE, LOAD_CELL_VALUES, UPDATE_CELL_TYPE, LOAD_FUNCTION } from "./actions";

const emptyState: GridState  = {
    cells: [[]],
    scope: {},
    meta: {
        title: 'Example Description',
        description: 'Describe your sheet snippet here'
    }
};

const reducer = (
    state: GridState = emptyState,
    action: GridAction
): GridState => {
    switch(action.type) {
        case LOAD_FUNCTION: {
            const { cells, meta } = action.value;

            return {
                ...state,
                cells,
                scope: evaluateExpressions(cells),
                meta
            }
        } case UPDATE_CELL_TYPE: {
            const cells = state.cells;

            const { tag, type } = action.value;
            const { rowIndex, colIndex } = alphanumericToIndicies(tag);

            const cell = (cells[rowIndex][colIndex].props as CellInputProps);
            cell.type = type;

            return {
                ...state,
                cells
            }
        } case UPDATE_CELL_VALUE: {
            const cells = state.cells;

            const { tag, value } = action.value;
            const { rowIndex, colIndex } = alphanumericToIndicies(tag);

            const cell = (cells[rowIndex][colIndex].props as CellInputProps);
            cell.value = value;

            return {
                ...state,
                cells,
                scope: evaluateExpressions(state.cells)
            };
        } case LOAD_CELL_VALUES: {
            const { cells } = state;

            return {
                ...state,
                cells,
                scope: evaluateExpressions(state.cells),
            }
        }
    }

    return state;
}

export default reducer;
