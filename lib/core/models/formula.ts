import { DescriptionProps } from "../../../components/Description";
import { CellModel } from "./cell";

export type FormulaMeta = DescriptionProps;

export interface IFormula {
    text?: string;
    meta: FormulaMeta;
    cells: CellModel[][];
    id?: string;
}
