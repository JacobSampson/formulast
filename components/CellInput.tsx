import {  useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { evaluate } from '../lib/core';
import { GridState, updateCellType, UPDATE_CELL_TYPE } from '../lib/store';
import { isNumber } from '../lib/util/numbers';

export type Direction = 'none' | 'left' | 'right' | 'top' | 'bottom';
export type InputType = 'text' | 'number' | 'constant' | 'function';

export interface CellInputProps {
    direction?: Direction;
    value: string;
    tag?: string;
    type?: InputType;
    live?: boolean;
    clearable?: boolean;
    placeHolder?: string;
    disabled?: boolean;
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
    z-index: 2;
    position: relative;

    &:hover, &:focus-within {
        z-index: 10;
        cursor: text;
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
    border-radius: 0px;
    text-align: center;

    ${({ disabled }) => disabled
    ? `
    background-color: white;
    filter: opacity(0.75);
    ` : ''}

    &:focus-within > * {
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
    animation: 0.35s ease-out 0s 1 popin;

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
    disabled = false,
    value = '',
    live = true,
    tag,
    onChange,
    ...props
}) => {
    const [rawValue, setRawValue] = useState(value);
    const scope: Object = useSelector(
        (state: GridState) => state.scope,
        shallowEqual
    );

    const dispatch = useDispatch();
    const updateCell = (type: InputType) => dispatch(updateCellType(tag, type));

    const updateRawValue = value => {
        let newValue = value;
        // if (type !== 'function' && value.toString().charAt(0) === '=') {
        //     setRawValue('=');
        //     updateCell('function');
        //     return;
        // } else
        if (type === 'number' && !(isNumber(value))) {
            newValue = '';
        }
        
        setRawValue(newValue);
        if (type === 'number' || live) {
            onChange(newValue);
        }
    };

    const isFunction = (value) => value.toString().charAt(0) === '=';

    // const computedValue: string = useSelector(
    //     (state: GridState) => state.scope[tag],
    //     shallowEqual
    // );
    // const valueText = computedValue == null ? evaluate(rawValue).toString() : computedValue;
    const valueText = evaluate(rawValue, scope).toString();

    return (
        <Container>
            <Input
                {...{ direction, ...props }}
                disabled={disabled}
                type={type}
                value={rawValue}
                placeholder={placeHolder}
                onBlur={() => onChange(rawValue)}
                onChange={event => updateRawValue(event.target.value)}
            />
            {((type === 'function') || (isFunction(rawValue))) &&
                <Value className='hideaway' title={valueText}>
                    <p>{valueText}</p>
                </Value>
            }
            {clearable && <Clear onClick={() => updateRawValue('')}>✕</Clear>}
        </Container>
    );
};
