import { DescriptionProps } from "../../components/Description";
import { CellModel } from "./cell";

export type FunctionMeta = DescriptionProps;

export interface IFunction {
    meta: FunctionMeta;
    cells: CellModel[][];
    id?: string;
}
