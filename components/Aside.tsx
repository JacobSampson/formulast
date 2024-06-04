import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { inDevEnvironment } from '../lib/client/constants';
import { HiX } from 'react-icons/hi';

export interface AsideProps {
    title: string;
    description?: string;
    links?: { url: string, label?: string }[],
    onLinkAction?: (url: string) => void,
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

const Description = styled.div<{ expanded?: boolean }>`
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

const StyledLink = styled.a`
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


export const Aside: React.FC<AsideProps & React.PropsWithChildren> = ({
    title,
    description,
    links,
    onLinkAction,
    children,
    ...props
}) => {
    const [expanded, setExpanded] = useState(false);

    const expandable = useMemo(
        () => links?.length > 5,
        [links?.length],
    );

    return <Container>
        <Title>
            {title}
            {children}
        </Title>
        {description && <Description>
            {description}
        </Description>}
        {links?.length && <Description>
            <span>
                {(expanded ? links :  links.slice(0, 5)).map(({ url, label }) => (
                    <p key={url}>
                        {
                            inDevEnvironment && (
                                <button
                                    onClick={() => onLinkAction(url)}
                                >
                                    <HiX />
                                </button>
                            )
                        }
                        <StyledLink href={url} target="_blank">
                            {label ?? url}
                        </StyledLink>
                    </p>
                ))}
            </span>
        </Description>}
        {expandable && !expanded && <Expander onClick={() => setExpanded(expanded => !expanded)}>See more</Expander>}
        {expanded && <Expander onClick={() => setExpanded(expanded => !expanded)}>Close</Expander>}
    </Container>
};
