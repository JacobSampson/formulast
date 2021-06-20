import { InputType } from "../../components/CellInput";
import { Direction as CellLabelDirection } from "../../components/CellLabel";

export enum CellType {
    LABEL = 'label',
    INPUT = 'input',
    EMPTY = 'empty'
}

export interface CellLabelModel {
    label: string;
    direction?: CellLabelDirection;
}

export interface CellInputModel {
    value: string;
    type?: InputType;
}

export interface CellExpressionModel {
    expression: string;
}

export interface CellModel {
    type: CellType;
    props: CellLabelModel | CellInputModel | CellExpressionModel;
}
