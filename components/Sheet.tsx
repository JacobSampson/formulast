import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CellModel } from '../lib/models';
import { GridState, RootState } from '../lib/store';
import { Description, DescriptionProps } from './Description';
import { Grid, GridProps } from './Grid';

export interface SheetProps{

}

const Container = styled.section<Partial<SheetProps>>`
    @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
        display: contents;
    }
`;

const GridContainer = styled.div`
    margin-left: -2em;
    overflow-x: auto;
    padding: 1em 0 1em 0;
    width: 100%;

    @media screen and (max-width: ${({ theme }) => theme.screen.xsmall}) {
        margin-left: 0;
    }
`;

export const Sheet: React.FC<SheetProps> = ({

}) => {
    const { cells, meta } = useSelector(
        (state: RootState) => state.grid,
        shallowEqual
    );

    return (
        <Container>
            <Description {...meta} />
            <GridContainer>
                {!!(cells && cells.length && cells[0].length) && <Grid cells={cells} />}
            </GridContainer>
        </Container>
    );
};
