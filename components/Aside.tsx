import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const CHAR_LIMIT = 100;

export interface AsideProps {
    title: string;
    description: string;
}

const Container = styled.div`
    background-color: #E8E6EA;
    color: ${({ theme }) => theme.palette.primary.main};
    display: flex;
    flex-direction: column;
    padding: 2em 1em;
    font-size: ${({ theme }) => theme.fontSize.small};
`;

const Title = styled.h3`
    font-size: ${({ theme }) => theme.fontSize.medium};
    margin: 0 1rem;
    font-weight: 200;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
`;

const Description = styled.p<{ expanded: boolean }>`
    /* ${({ expanded }) => (!expanded) && `
        max-height: 3em;
        overflow: hidden;
        // white-space: nowrap;
        // text-overflow: ellipsis;
    `} */
    padding: 0;
    margin: 1rem;
`;

const Expander = styled.p`
    width: 100%;
    text-align: center;
    transition: 0.15s ease-in-out;
    margin: 0;
    padding: 0;

    &:hover {
        cursor: pointer;
        opacity: 50%;
    }
`;

export const Aside: React.FC<AsideProps> = ({
    title,
    description,
    children,
    ...props
}) => {
    const [expanded, setExpanded] = useState(false);

    return <Container>
        <Title>
            {title}
            {children}
        </Title>
        <Description expanded={expanded}>
            {description}
        </Description>
        {/* {!expanded && <Expander onClick={() => setExpanded(expanded => !expanded)}>Read more</Expander>}
        {expanded && <Expander onClick={() => setExpanded(expanded => !expanded)}>Close</Expander>} */}
    </Container>
};
