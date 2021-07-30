import { DescriptionProps } from "../../../components/Description";
import { CellModel } from "./cell";

export type FormulaMeta = DescriptionProps;

export interface IFormula {
    meta: FormulaMeta;
    cells: CellModel[][];
    id?: string;
}
