import { InputType, Unit, Variant } from "../../../components/CellInput";
import { CellModel } from "../../models/cell";
import { FormulaMeta, IFormula } from "../../models/formula";
import { action, createAction } from 'typesafe-actions';
import { DELETE_CELL, LOAD_CELL_VALUES, LOAD_FORMULA, UPDATE_CELL_META, UPDATE_CELL_VALUE, UPDATE_FORMULA_META, UPDATE_SIZE } from "../constants";

export const updateCellValue = (tag: string, value?: string | number) => action(UPDATE_CELL_VALUE, { tag, value });
export const updateCellMeta = (tag: string, payload: { variant?: Variant, unit?: Unit, disabled?: boolean }) => action(UPDATE_CELL_META, { tag, ...payload });
export const loadCellValues = (cells: CellModel[][]) => action(LOAD_CELL_VALUES, { cells });
export const loadFormula = (cells: CellModel[][], meta: FormulaMeta) => action(LOAD_FORMULA, { cells, meta });
export const updateSize = (width: number, height: number) => action(UPDATE_SIZE, { width, height });
export const deleteCell = (tag: string) => action(DELETE_CELL, { tag });
export const updateFormulaMeta = (meta: FormulaMeta) => action(UPDATE_FORMULA_META, { meta });
