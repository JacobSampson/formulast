import * as math from 'mathjs';
import { CellModel } from "../models/cell";

const STACK_LIMIT = 50;

interface Tag {
    tag: string;
    ref: CellModel;
}

export const evaluate = (expression: string, scope = {}): number | string => {
    if ((!expression) || (expression.length === 0)) {
        return expression || '';
    }
    if (expression.charAt(0) === '=') {
        expression = expression.slice(1);
    }

    try {
        const result = math.evaluate(expression, scope);
        return result === 0 ? 0 : result || '';
    } catch(e) {
        return (e || '').toString();
    }
};

/**
 * @src https://stackoverflow.com/questions/8240637/convert-numbers-to-letters-beyond-the-26-character-alphabet
 * @param num 
 * @returns 
 */
function numberToLetters(num) {
    let letters = ''
    while (num >= 0) {
        letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[num % 26] + letters
        num = Math.floor(num / 26) - 1
    }
    return letters
}
export const indicesToAlphanumeric = (rowIndex, colIndex) => {
    const letter = numberToLetters(rowIndex);
    return `${letter}${colIndex + 1}`;
}
