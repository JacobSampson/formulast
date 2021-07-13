import React, { useCallback, useState } from 'react';
import { HiMinus, HiPlus, HiPlusCircle, HiPlusSm } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CellModel, CellType } from '../lib/models/cell';
import { RootState, updateCellValue, updateCellUnit, updateSize } from '../lib/store';
import { indicesToAlphanumeric, numberToLetters } from '../lib/util';
import { defaultTransition } from '../styles/constants';
import { CellInput, CellInputProps, Unit } from './CellInput';
import { CellLabel, CellLabelProps } from './CellLabel';

interface Dimension {
    width: number;
    height: number;
}

const MAX_NUM_ROWS = 15;
const MAX_NUM_COLUMNS = 5;

export interface GridProps {
    /**
     * 2D array of cells
     */
    cells: readonly CellModel[][];
}

const Container = styled.div`
    display: grid;
    grid-template-columns: 1fr 2.5rem;
    grid-template-rows: 1fr 2.5rem;
    gap: 1em;
    width: fit-content;
`;

const Buttons = styled.div<{ vertical?: boolean }>`
    display: flex;
    gap: 0.5em;

    ${({ vertical }) => !vertical && `
        margin-left: 2.25rem;
        margin-right: 0.25rem;
        flex-direction: row;
    `}
    ${({ vertical }) => vertical && `
        margin-top: 2.25rem;
        margin-bottom: 0.25rem;
        flex-direction: column;
    `}
`;

const UpdateButton = styled.button<{ mini?: boolean }>`
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: ${defaultTransition};
  flex: 1;

  color: lightgray;
  background-color: white;
  border: 2px solid lightgray;
  ${({ mini }) => mini && `
    color: white;
    background-color: lightgray;
    flex: 0;
    flex-basis: 2em;
  `}

  font-size: ${({ theme }) => theme.fontSize['large']};
  padding: 0.5em 0;
  box-shadow: 0.25em 0.25em 0.125em ${({ theme }) => theme.shadow.light};

  animation: 0.25s ease-out 0s 1 popin;

  :hover {
    transform: translateY(0.125em);
    box-shadow: 0.125em 0.125em 0px ${({ theme }) => theme.shadow.light};
  }

  :disabled {
      user-select: none;
      pointer-events:none;
      filter: opacity(0.5);
  }
`;

const GridContainer = styled.section<Partial<GridProps> & ({ dimension: Dimension })>`
    display: grid;
    grid-template-columns: 2rem repeat(${({ dimension }) => dimension.width}, 1fr);
    grid-template-rows: 2rem repeat(${({ dimension }) => dimension.height}, 1fr);
    position: relative;
    width: fit-content;
`;

const Cell = styled.div<{ empty?: boolean }>`
    height: 100%;
    min-height: 50px;
    width: 220px;
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
    if (!cells || !cells.length || !cells[0].length) return (<></>);

    const gridDimension: Dimension = {
        width: cells[0].length,
        height: cells.length
    };

    const dispatch = useDispatch();

    const setCellValue = (tag: string, value: string | number) => dispatch(updateCellValue(tag, value));
    const setCellUnit = (tag: string, value: Unit) => dispatch(updateCellUnit(tag, value))
    const addColumn = () => dispatch(updateSize(gridDimension.width + 1, gridDimension.height ));
    const addRow = () => dispatch(updateSize(gridDimension.width, gridDimension.height + 1 ));
    const removeColumn = () => dispatch(updateSize(gridDimension.width - 1, gridDimension.height ));
    const removeRow = () => dispatch(updateSize(gridDimension.width, gridDimension.height - 1 ));

    const mode = useSelector((state: RootState) => state.view.mode);

    return (
        <Container>
            <GridContainer {...{ dimension: gridDimension, edit: mode === 'edit', ...props }}>
                <AxisLabel key={0} empty></AxisLabel>
                {(new Array(gridDimension.width).fill(null)).map((_, index) => {
                    const colLabel = numberToLetters(index);
                    return <AxisLabel key={colLabel}>{colLabel}</AxisLabel>;
                })}
                {cells.map((row, rowIndex) => {
                    const rowCells = row.map((cell, colIndex) => {
                        const key = indicesToAlphanumeric(rowIndex, colIndex);

                        if (!cell) {
                            if (mode === 'edit') {
                                return <Cell empty key={key}>
                                    <CellInput live={false} tag={key} />
                                </Cell>
                            }

                            return <Cell key={key} />
                        }

                        return <Cell key={key}>
                            <CellInput
                                {...(cell as CellInputProps)}
                                disabled={(mode === 'edit') ? false : cell.disabled}
                                tag={key} />
                        </Cell>
                    });
                    const key = indicesToAlphanumeric(rowIndex, 0);
                    return <>
                        <AxisLabel key={key}>{rowIndex + 1}</AxisLabel>
                        {rowCells}
                    </>
                })}
            </GridContainer>
            {mode === 'edit' &&
                <>
                    <Buttons vertical>
                        <UpdateButton onClick={() => removeColumn()} mini disabled={gridDimension.width === 1}><HiMinus /></UpdateButton>
                        <UpdateButton onClick={() => addColumn()} disabled={gridDimension.width === MAX_NUM_COLUMNS}><HiPlus /></UpdateButton>
                    </Buttons>
                    <Buttons>
                        <UpdateButton onClick={() => removeRow()} mini disabled={gridDimension.height === 1}><HiMinus /></UpdateButton>
                        <UpdateButton onClick={() => addRow()} disabled={gridDimension.height === MAX_NUM_ROWS}><HiPlus /></UpdateButton>
                    </Buttons>
                </>
            }
        </Container>
    );
};
