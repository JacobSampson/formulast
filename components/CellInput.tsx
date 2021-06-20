import {  useState } from 'react';
import styled from 'styled-components';
import { evaluate } from '../lib/core';

export type Direction = 'none' | 'left' | 'right' | 'top' | 'bottom';
export type InputType = 'text' | 'number' | 'constant' | 'function';

export interface CellInputProps {
    direction?: Direction;
    value: string;
    tag: string;
    type?: InputType;
    clearable?: boolean;
    placeHolder?: string;
    onChange: (newValue: string) => void;
};

const Container = styled.section<React.FC<CellInputProps>>`
    --local-gap: var(--gap, 0.5em);

    height: calc(100% - var(--local-gap));
    width: calc(100% - var(--local-gap));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: calc(var(--local-gap) / 2);
    box-shadow: 0px 0px 3px lightgray;
    z-index: 0;
    position: relative;

    &:hover, &:focus-within {
        z-index: 5;
    }

    &:hover > .hideaway, &:focus-within > .hideaway {
        /* opacity: 0%; */
        /* height: 0%; */
        transform: translateY(calc(100% + var(--local-gap)));
        opacity: 0.85;
        z-index: 10;
    }

    /* &:focus-within, > .hideaway > * {
        display: none;
    }*/
`;

const Input = styled.input<Partial<CellInputProps>>`
    flex-grow: 1;
    height: 100%;
    padding: 0;
    margin: 0;
    border: 2px solid lightgray;
    text-align: center;

    &:focus-within {
        border: 4px solid black;
    }
`;

const Clear = styled.div`
    min-width: 3em;
    width: 10%;
    height: 20px;
    color: black;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
`;

const Value = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 100%;
    transition: 0.15s ease-out;
    z-index: 5;
    white-space: nowrap;

    > * {
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 1em;
    }
`;

export const CellInput: React.FC<CellInputProps> = ({
    direction = 'none',
    type = 'text',
    placeHolder = '',
    clearable = false,
    value = '',
    tag,
    onChange,
    ...props
}) => {
    const [rawValue, setRawValue] = useState(value);

    const updateRawValue = value => {
        if (type === 'number' && !(!isNaN(parseFloat(value)) && isFinite(value))) {
            setRawValue('');
            return;
        }

        setRawValue(value);
    };

    const valueText = evaluate(rawValue).toString();

    return (
        <Container>
            <Input
                {...{ direction, ...props }}
                type={type}
                value={rawValue}
                placeholder={placeHolder}
                onBlur={() => onChange(rawValue)}
                onChange={event => updateRawValue(event.target.value)}
            />
            {(type === 'function') &&
                <Value className='hideaway' title={valueText}>
                    <p>{valueText}</p>
                </Value>
            }
            {clearable && <Clear onClick={() => updateRawValue('')}>✕</Clear>}
        </Container>
    );
};
