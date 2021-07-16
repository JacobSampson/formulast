import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Direction, Variant } from "../../../components/CellInput";
import { evaluateExpressions } from "../../core";
import { CellModel   } from "../../models";
import { FormulaMeta } from "../../models/formula";
import { alphanumericToIndicies, deepCopy } from "../../util";

export type GridState = {
    cells: CellModel[][];
    scope: Object;
    meta: FormulaMeta;
};

const initialState: GridState  = {
    cells: [[]],
    scope: {},
    meta: {
        title: 'Example Description',
        description: 'Describe your sheet snippet here'
    }
};

const grid = createSlice({
    name: 'grid',
    initialState,
    reducers: { 
        loadFormula(state, { payload }: PayloadAction<{ cells: CellModel[][], meta: FormulaMeta }>) {
            const { cells, meta } = payload;
            const scope = evaluateExpressions(cells);
    
            return {
                ...state,
                cells,
                meta,
                scope
            }
        },
        updateCellValue(state, { payload }: PayloadAction<{ tag: string, value?: string | number }>) {
            const cells = deepCopy(state.cells);
    
            const { tag, value } = payload;
            const { rowIndex, colIndex } = alphanumericToIndicies(tag);
    
            if (value == null) {
                cells[rowIndex][colIndex] = null;
            } else {
                // Add new cell props if none existed before
                if (!cells[rowIndex][colIndex]) {
                    cells[rowIndex][colIndex] = { value: '' };
                }
                const cell = cells[rowIndex][colIndex];
                cell.value = `${value}`;
            }
    
            const scope = evaluateExpressions(cells);
    
            return {
                ...state,
                cells,
                scope
            };
        },
        loadCellValues(state, { payload }: PayloadAction<{ cells: CellModel[][] }>) {
            const { cells } = payload;
            const scope = evaluateExpressions(state.cells);
    
            return {
                ...state,
                cells,
                scope,
            };
        },
        updateSize(state, { payload }: PayloadAction<{ width: number, height: number }>) {
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
        },
        deleteCell(state, { payload }: PayloadAction<{ tag: string }>) {
            const cells = deepCopy(state.cells);
    
            const { tag } = payload;
            const { rowIndex, colIndex } = alphanumericToIndicies(tag);
    
            cells[rowIndex][colIndex] = null;
            const scope = evaluateExpressions(cells);
    
            return {
                ...state,
                cells,
                scope
            };
        },
        updateFormulaMeta(state, { payload }: PayloadAction<{ meta: FormulaMeta }>) {
            const { meta } = payload;
            return {
                ...state,
                meta
            };
        },
        updateCellMeta(
            state,
            { payload }: PayloadAction<{
                tag: string,
                unit: string,
                variant: Variant & '',
                disabled: boolean,
                direction?: Direction
            }>
        ) {
            const cells = deepCopy(state.cells);
    
            const { tag, unit, variant, disabled, direction } = payload;
            const { rowIndex, colIndex } = alphanumericToIndicies(tag);
    
            // Add new cell props if none existed before
            if (!cells[rowIndex][colIndex]) {
                cells[rowIndex][colIndex] = { value: '' };
            }
    
            const cell = cells[rowIndex][colIndex];
    
            if ((!unit || (unit === '')) && (cell.unit)) {
                // Remove unit tag
                delete cell.unit;
            } else {
                cell.unit = unit;
            }
    
            if ((!variant || (variant === '')) && cell.variant) {
                // Remove variant tag
                delete cell.variant;
            } else {
                cell.variant = variant;
            }
    
            if (disabled == null || !disabled) {
                // Remove disabled tag as is default
                delete cell.disabled;
            } else {
                cell.disabled = true;
            }

            if ((!direction || (direction === 'none')) && cell.direction) {
                // Remove direction tag
                delete cell.direction;
            } else {
                cell.direction = direction;
            }
    
            return {
                ...state,
                cells
            };
        }
    }
});

export const {
    loadFormula,
    updateCellValue,
    loadCellValues,
    updateSize,
    deleteCell,
    updateFormulaMeta,
    updateCellMeta
} = grid.actions;
export default grid.reducer;
