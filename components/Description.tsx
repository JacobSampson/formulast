import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { HiOutlineEye, HiOutlineSave, HiOutlineStar, HiPencilAlt, HiStar } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IAuthor } from '../lib/models/author';
import { ITag } from '../lib/models/tag';
import { saveFormula } from '../lib/services/formulas';
import { RootState, setViewState, updateFormulaMeta, ViewMode } from '../lib/store';
import { Button } from './Button';
import { FieldInput } from './FieldInput';
import { Pill } from './Pill';
import { CellModel } from '../lib/models';
import { FormulaMeta } from '../lib/models/formula';
import { EditBar } from './EditBar';

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
    gap: 0.5rem;
`;

const Tag = styled.div`
    height: calc(${({ theme }) => theme.fontSize.small} * 2);
    font-size: ${({ theme }) => theme.fontSize.small};
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

const StyledEditBar = styled(EditBar)`
    @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
        grid-template-rows: 2.5rem 2.5rem;
        height: 5rem;
    }
`;

const StyledPill = styled(Pill)`
    width: '3rem';
`;

export const Description: React.FC<DescriptionProps> = ({
    title,
    description,
    author,
    tags
}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const setMode = (mode: ViewMode) => dispatch(setViewState(mode));
    const updateMeta = (update: any) => dispatch(updateFormulaMeta({
        title,
        description,
        author,
        tags,
        ...update
    }));

    const addTag = (newTag) => {
        if (!newTag || (newTag === '')) return;
        if (tags.find(tag => tag.label === newTag)) return;

        updateMeta({
            tags: [...tags, { parent: '', label: newTag }]
        });
    }

    const removeTag = (removedTag: string) => {
        const updatedTags = tags.filter(tag => tag.label != removedTag);
        updateMeta({
            tags: updatedTags
        });
    }

    const setFormula = (cells: CellModel[][], meta: FormulaMeta) => {
        saveFormula(cells, meta).then(response => {
            if (response?.redirect?.destination) router.push(response.redirect.destination);
        });
    }    

    const mode = useSelector((state: RootState) => state.view.mode);
    const editable = mode === 'edit';
    const { cells, meta } = useSelector((state: RootState) => state.grid);

    return (
        <Container>
            <Title>
                <FieldInput
                    value={title}
                    editable={editable}
                    onChange={event => updateMeta({ title: event.target.value })}></FieldInput>
            </Title>
            {author && <Author>Created by {author.username}</Author>}
            <Elements>
                <Tags>
                    {tags && tags.map(({ label }) => {
                        return <Tag key={label}>
                            <Pill value={label} editable={editable} onAction={() => removeTag(label)}/>
                        </Tag>
                    })}
                    {tags && editable && <Tag><StyledPill add editable onAction={(newTag) => addTag(newTag)}/></Tag>}
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
                        onClick={() => setFormula(cells, meta)}>
                        <> <HiOutlineSave /> Save </>
                    </Button>
                    {/* <Button size='medium' variant='primary'><HiOutlineStar /> 67</Button> */}
                </Buttons>
            </Elements>
            <DescriptionBlock>
            <FieldInput
                value={description}
                area
                editable={mode === 'edit'}
                onChange={event => updateMeta({ description: event.target.value })}
            />
            </DescriptionBlock>
            {mode === 'edit' && <StyledEditBar />}
        </Container>
    )
}