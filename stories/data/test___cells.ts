import { CellModel, CellType } from "../../lib/models";

export const testCells: CellModel[][] = [
    [{ type: CellType.INPUT, props: { value: '2', disabled: true } }, { type: CellType.LABEL, props: { label: 'Input 1', direction: 'left' } }, { type: CellType.INPUT, props: { type: 'function', value: '=2+2' } }],
    [{ type: CellType.INPUT, props: { value: '2' } },  { type: CellType.LABEL, props: { label: 'Input 2', direction: 'right' } }, { type: CellType.INPUT, props: { value: '2' } }],
    [null, null, { type: CellType.INPUT, props: { value: '=A1+4', disabled: true } }],
];

export const testCells__UCB: CellModel[][] = [
    [{ type: CellType.LABEL, props: { label: 'Parent', direction: 'bottom' }}, { type: CellType.LABEL, props: { label: 'Wins', direction: 'bottom' }}, { type: CellType.LABEL, props: { label: 'Me', direction: 'bottom' }}],
    [{ type: CellType.INPUT, props: { value: '2' }}, { type: CellType.INPUT, props: { value: '0' }}, { type: CellType.INPUT, props: { value: '1' }}],
    [null,null,null],
    [{ type: CellType.LABEL, props: { label: 'UCB', direction: 'right', variant: 'primary' }}, { type: CellType.INPUT, props: { value: '=B2/C2+sqrt(2*log(A2,e)/C2)', disabled: true }},null]
];
