import React from 'react';
import { Cell, CellProps } from './Cell';

export interface GridProps {
    /**
     * 2D array of cells
     */
    cells
}

export const Grid = (
    cells
) => {
    

    const Grid = cells.map(row => {
        row.map(cell => (
            <Cell></Cell>
        ));
    });

    return (
        <div>
            {Grid}
        </div>
    )
}
