import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { evaluate, indicesToAlphanumeric } from '../lib/core';
import { CellInputModel, CellLabelModel, CellModel, CellType } from '../lib/models/cell';
import { updateCellValue } from '../lib/store';
import { CellInput, CellInputProps } from './CellInput';
import { CellLabel } from './CellLabel';

interface Dimension {
    width: number;
    height: number;
}

export interface GridProps {
    /**
     * 2D array of cells
     */
    cells: CellModel[][];
}

const Container = styled.section<Partial<GridProps> & ({ dimension: Dimension })>`
    display: grid;
    grid-template-columns: repeat(${({ dimension }) => dimension.width}, 1fr);
    grid-template-rows: repeat(${({ dimension }) => dimension.height}, 1fr);
    position: relative;
`;

const Cell = styled.div`
    width: 200px;
    height: 50px;
    position: relative;
`;

export const Grid: React.FC<GridProps> = ({
    cells = [],
    ...props
}) => {
    if (!cells || !cells.length || !cells[0].length) {
        return;
    }

    const dispatch = useDispatch();

    const updateCell = useCallback(
        (tag: string, value: string | number) => dispatch(updateCellValue(tag, value)),
        [dispatch]
    );

    const gridDimension: Dimension = {
        width: cells[0].length,
        height: cells.length
    };

    const scope = {};

    const compute = (rowIndex, colIndex) => {
        const linkedCompute = (expression: string): string => {
            const value = evaluate(expression, scope).toString();
            const tag = indicesToAlphanumeric(rowIndex, colIndex);
            scope[tag] = value;
            return value;
        }

        return linkedCompute;
    }

    return (
        <Container {...{ dimension: gridDimension, ...props }}>
            {cells.map((row, rowIndex) => {
                return row.map((cell, colIndex) => {
                    if (!cell) {
                        return <Cell />
                    }

                    if ((cell.props as CellInputProps).value != null) {
                        compute(rowIndex, colIndex)((cell.props as CellInputProps).value);
                    }

                    switch(cell.type) {
                        case CellType.LABEL:
                            return <Cell>
                                <CellLabel {...(cell.props as CellLabelModel)} direction='left' />
                            </Cell>
                        case CellType.INPUT:
                            return <Cell>
                                <CellInput
                                    {...(cell.props as CellInputModel)}
                                    onChange={newValue => updateCell(indicesToAlphanumeric(rowIndex, colIndex), newValue)}
                                    tag={indicesToAlphanumeric(rowIndex, colIndex)} />
                            </Cell>
                        default:
                            return <Cell />
                    }
                });
            })}
        </Container>
    );
};
