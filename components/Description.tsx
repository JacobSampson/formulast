import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import { HiOutlineEye, HiOutlineSave, HiPencilAlt } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, saveFormula, setViewState, updateFormulaMeta, ViewMode } from '../lib/client';
import { Button } from './Button';
import { FieldInput } from './FieldInput';
import { Pill } from './Pill';
import { EditBar } from './EditBar';
import { CellModel, FormulaMeta, IAuthor, ITag } from '../lib/core';
import { inDevEnvironment } from '../lib/client/constants';
import Link from 'next/link';
import TeXToSVG from 'tex-to-svg';

export interface DescriptionProps {
    title: string;
    description: string;
    author?: IAuthor;
    tags?: ITag[];
    links?: { url: string, label?: string }[];
    src?: string;
    text?: string;
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

const ExternalReference = styled(Link)`
    text-decoration: none;
    color: ${({ theme }) => theme.palette.primary.main};
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSize.small};
    position: relative;

    &:after {
        content: '';
        display: block;
        width: 0%;
        height: 0.05em;
        background-color: ${({ theme }) => theme.palette.common.black};
        position: absolute;
        bottom: 0;
        left: 0;
        transition: all 0.15s ease-in-out;
    }

    &:hover * {
        opacity: 80%;
        text-decoration: none;
    }

    &:hover:after {
        opacity: 80%;
        width: 100%;
    }
`;

const TextBlock: React.FC<{ text: string }> = ({ text, ...props }) => {
    const src = useMemo(
        () => {
            const svg = TeXToSVG(text)
            return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
        },
        [text],
    );

    return (
        <div {...props}>
            <img src={src} />
        </div>
    );
}

const StyledTextBlock = styled(TextBlock)`
    padding: 2rem 0 1rem 0;
`;

export const Description: React.FC<DescriptionProps> = ({
    title,
    description,
    author,
    tags,
    src,
    text,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();

    console.log('text', text, src)

    const setMode = (mode: ViewMode) => dispatch(setViewState({ mode }));
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
    const editable = inDevEnvironment;
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
            {src && <ExternalReference href={src}>See {src}</ExternalReference>}
            <Elements>
                <Tags>
                    {tags && tags.map(({ label }) => {
                        return <Tag key={label}>
                            <Pill value={label} editable={editable} onAction={() => removeTag(label)} />
                        </Tag>
                    })}
                    {tags && editable && <Tag><StyledPill add editable onAction={(newTag) => addTag(newTag)} /></Tag>}
                </Tags>
                {editable && <Buttons>
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
                </Buttons>}
            </Elements>
            {meta?.text && <StyledTextBlock text={text} />}
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