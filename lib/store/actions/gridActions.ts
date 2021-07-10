import { InputType } from "../../../components/CellInput";
import { CellModel } from "../../models/cell";
import { FormulaMeta, IFormula } from "../../models/formula";
import { action, createAction } from 'typesafe-actions';
import { DELETE_CELL, LOAD_CELL_VALUES, LOAD_FORMULA, UPDATE_CELL_TYPE, UPDATE_CELL_VALUE, UPDATE_SIZE } from "../constants";

export const updateCellValue = (tag: string, value: string | number) => action(UPDATE_CELL_VALUE, { tag, value });
export const updateCellType = (tag: string, type: InputType) => action(UPDATE_CELL_TYPE, { tag, type });
export const loadCellValues = (cells: CellModel[][]) => action(LOAD_CELL_VALUES, { cells });
export const loadFormula = (cells: CellModel[][], meta: FormulaMeta) => action(LOAD_FORMULA, { cells, meta });
export const updateSize = (width: number, height: number) => action(UPDATE_SIZE, { width, height });
export const deleteCell = (tag: string) => action(DELETE_CELL, { tag });
