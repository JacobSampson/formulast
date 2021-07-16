import * as math from 'mathjs';
import { CellModel, CellType } from '../models/cell';
import { indicesToAlphanumeric } from '../util';
import { isNumber } from '../util/numbers';
import { determineType } from './input-parser';

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

export const evaluateExpressions = (cells: CellModel[][]): Object => {
    if (!cells || !cells.length || !cells[0].length) {
        return;
    }
    
    // Filter out inputs
    const cellInputs = [];
    for (let rowIndex = 0; rowIndex < cells.length; rowIndex++) {
        for (let colIndex = 0; colIndex < cells[rowIndex].length; colIndex++) {
            const cell = cells[rowIndex][colIndex];
            if (cell && (['function', 'value'].includes(determineType(cell.value)))) {
                cellInputs.push(cell);
            }
        }
    }

    // Run evaluations
    const scope = {};
    let currIndex = 0;
    let untouched = false;
    while (cellInputs.length) {
        if (currIndex === 0) {
            untouched = true;
        }

        const cell = cellInputs[currIndex] as CellModel;

        const value = evaluate(cell.value, scope);
        if (isNumber(value.toString())) {
            // Update value for cell in scope
            scope[cell.tag] = value;
    
            // Remove successful calculation
            cellInputs.splice(currIndex, 1);
            untouched = false;
            currIndex = 0;
            continue;
        } else {
            currIndex++;
        }

        if (currIndex >= cellInputs.length) {
            // Throw error if no update on evaluation pass through
            if (untouched) {
                // throw new Error('Incorrect function sequence');
                return {
                    ...scope,
                    [(cell.tag)]: 'NAN'
                };
            }

            currIndex = 0;
        }
    }

    return scope;
};
