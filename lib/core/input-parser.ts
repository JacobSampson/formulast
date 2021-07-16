import { Direction, InputType } from "../../components/CellInput";

export const parseLabel = (label: string) => {
    if ((label.toString()).match(/\".*\"(u|d|r|l|)/)) {
        return label.split('"')[1];
    } else if (label.toString().charAt(0) === '"') {
        return label.slice(1);
    }

    console.log(label)
    throw new Error('Incorrect label format');
}

export const determineType = (value?: string): InputType => {
    if (!value) return 'empty';

    const isFunction = value.toString().charAt(0) === '=';
    const isLabel = (value.toString().charAt(0) === '"')
        || (value.toString()).match(/\".*\"/);

    if (isFunction) {
        return 'function';
    }
    
    if (isLabel) {
        return 'label';
    }

    return !value || value.toString().length === 0 ? 'empty' : 'value';
}
