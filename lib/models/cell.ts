import { CellInputProps, InputType, Unit, Variant } from "../../components/CellInput";
import { CellLabelProps, Direction as CellLabelDirection } from "../../components/CellLabel";

export enum CellType {
    LABEL = 'label',
    INPUT = 'input',
    VALUE = 'value',
    EMPTY = 'empty'
}


export interface CellModel {
    unit?: Unit;
    value?: string,
    variant?: Variant,
    disabled?: boolean;
    tag?: string;
    type?: InputType;
}
