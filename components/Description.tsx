import React, { useState } from 'react';
import { HiOutlineEye, HiOutlineSave, HiOutlineStar, HiPencilAlt, HiStar } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { saveFormula } from '../lib/core/formula-converter';
import { IAuthor } from '../lib/models/author';
import { ITag } from '../lib/models/tag';
import { RootState, setViewState, ViewMode, ViewState } from '../lib/store';
import { Button } from './Button';

export interface DescriptionProps {
    title: string;
    description: string;
    author?: IAuthor;
    tags?: ITag[];
}

const Container = styled.header`
    width: 100%;

    @media screen and (max-width: ${({ theme }) => theme.screen.xsmall}) {
        margin: 0 2em;
        width: calc(100% - 4em);
    }
`;

const Title = styled.h2`
    font-size: ${({ theme }) => theme.fontSize.xlarge};
    font-weight: 300;
    margin: 0;
    margin-top: 1em;
`;

const Author = styled.div`
    font-size: ${({ theme }) => theme.fontSize.small};
    margin: 1em 0 1.5em 0;
`;

const Elements = styled.div`
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: relative;
    min-height: 3em;
    border-bottom: 0.1em solid lightgray;
    padding: 1em 0;

    @media screen and (max-width: ${({ theme }) => theme.screen.xsmall}) {
        display: grid;
        grid-template-rows: 2em 4em;
    }
`;

const Tags = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const Tag = styled.div`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border-radius: 2em;
    padding: 0.25em 1em;
    font-size: ${({ theme }) => theme.fontSize.small};
    height: calc(${({ theme }) => theme.fontSize.small} * 2);
    margin-right: 1em;
`;

const Buttons = styled.div`
    display: inline-flex;

    & > *:first-child {
        margin-right: 1em;
    }
`;

const DescriptionBlock = styled.p`
    font-size: ${({ theme }) => theme.fontSize.medium};
`;

export const Description: React.FC<DescriptionProps> = ({
    title,
    description,
    author,
    tags
}) => {
    const dispatch = useDispatch();
    const setMode = (mode: ViewMode) => dispatch(setViewState(mode));
    const mode = useSelector((state: RootState) => state.view.mode);
    const { cells, meta } = useSelector((state: RootState) => state.grid);

    return (
        <Container>
            <Title>{title}</Title>
            {author && <Author>Created by {author.username}</Author>}
            <Elements>
                <Tags>
                    {tags && tags.map(({ label }) => <Tag key={label}>{label}</Tag>)}
                </Tags>
                <Buttons>
                    <Button
                        variant={mode === 'edit' ? 'secondary' : 'primary'}
                        size='medium'
                        onClick={() => mode === 'edit' ? setMode('view') : setMode('edit')}>
                        {mode === 'view'
                            ? <> <HiPencilAlt /> Edit </>
                            : <> <HiOutlineEye /> View </>
                        }
                    </Button>
                    <Button
                        size='medium'
                        onClick={() => saveFormula(cells, meta)}>
                        <> <HiOutlineSave /> Save </>
                    </Button>
                    {/* <Button size='medium' variant='primary'><HiOutlineStar /> 67</Button> */}
                </Buttons>
            </Elements>
            <DescriptionBlock>{description}</DescriptionBlock>
        </Container>
    )
}