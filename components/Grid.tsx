import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { CellModel, CellType } from '../lib/models/cell';
import { updateCellValue } from '../lib/store';
import { indicesToAlphanumeric, numberToLetters } from '../lib/util';
import { CellInput, CellInputProps } from './CellInput';
import { CellLabel, CellLabelProps } from './CellLabel';

interface Dimension {
    width: number;
    height: number;
}

export interface GridProps {
    /**
     * 2D array of cells
     */
    cells: readonly CellModel[][];
}

const Container = styled.section<Partial<GridProps> & ({ dimension: Dimension })>`
    display: grid;
    grid-template-columns: 2em repeat(${({ dimension }) => dimension.width}, 1fr);
    grid-template-rows: 2em repeat(${({ dimension }) => dimension.height}, 1fr);
    position: relative;
    width: fit-content;
`;

const Cell = styled.div<{ empty?: boolean }>`
    height: 100%;
    min-height: 50px;
    width: 200px;
    position: relative;
    ${({ empty }) => empty
        ? `
        border: none;
        // z-index: 0;
        ` : `
        // border: 0.5px solid rgba(121, 121, 121, 0.15);
        // z-index: 1;

        // ::before {
        //     content: '';
        //     display: block;
        //     background-color: rgba(0, 0, 0, 5%);
        //     width: 300%;
        //     height: 300%;
        //     position: absolute;
        //     top: -100%;
        //     left: -100%;
        //     background: radial-gradient(transparent, white);
        //     z-index: 0;
        // }
        `
    }
`;

const AxisLabel = styled.div<{ empty?: boolean }>`
    position: relative;
    display: flex;
    justify-self: center;
    font-size: ${({ theme }) => theme.fontSize.small};
    color: #b3b3b3;
    width: calc(100% - 0.5em);    
    height: calc(100% - 0.5em);    
    justify-content: center;
    align-items: center;

    ${({ empty }) => empty ? 'opacity: 0%;' : ''}
`;

export const Grid: React.FC<GridProps> = ({
    cells = [],
    ...props
}) => {
    if (!cells || !cells.length || !cells[0].length) {
        return (<></>);
    }

    const dispatch = useDispatch();
    const updateCell = (tag: string, value: string | number) => dispatch(updateCellValue(tag, value));

    const gridDimension: Dimension = {
        width: cells[0].length,
        height: cells.length
    };

    return (
        <Container {...{ dimension: gridDimension, ...props }}>
            <AxisLabel key={0} empty></AxisLabel>
            {(new Array(gridDimension.width).fill(null)).map((_, index) => {
                const colLabel = numberToLetters(index);
                return <AxisLabel key={colLabel}>{colLabel}</AxisLabel>;
            })}
            {cells.map((row, rowIndex) => {
                const rowCells = row.map((cell, colIndex) => {
                    const key = indicesToAlphanumeric(rowIndex, colIndex);

                    if (!cell) {
                        return <Cell key={key} />
                    }

                    switch(cell.type) {
                        case CellType.LABEL:
                            return <Cell key={key}>
                                <CellLabel {...(cell.props as CellLabelProps)} />
                            </Cell>
                        case CellType.INPUT:
                            return <Cell key={key}>
                                <CellInput
                                    {...(cell.props as CellInputProps)}
                                    tag={key}
                                    onChange={newValue => updateCell(indicesToAlphanumeric(rowIndex, colIndex), newValue)} />
                            </Cell>
                        default:
                            return <Cell empty key={key}/>
                    }
                });
                const key = indicesToAlphanumeric(rowIndex, 0);
                return <>
                    <AxisLabel key={key}>{rowIndex}</AxisLabel>
                    {rowCells}
                </>
            })}
        </Container>
    );
};
