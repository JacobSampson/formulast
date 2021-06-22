import { CellInputProps, InputType } from "../../components/CellInput";
import { CellLabelProps, Direction as CellLabelDirection } from "../../components/CellLabel";

export enum CellType {
    LABEL = 'label',
    INPUT = 'input',
    EMPTY = 'empty'
}

export interface CellModel {
    type: CellType;
    props: Partial<CellLabelProps> | Partial<CellInputProps>;
    tag?: string;
}
