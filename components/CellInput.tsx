import {  useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState, setActiveCell, updateCellValue } from '../lib/client';
import { evaluate, isNumber } from '../lib/core';
import { determineType, parseLabel } from '../lib/core/util/input-parser';
import { defaultTransition } from '../styles/constants';

export type Direction = 'none' | 'left' | 'right' | 'top' | 'bottom';
export type Variant = 'primary' | 'secondary';
export type InputType = 'function' | 'label' | 'value' | 'empty';
export type Unit = '$' | 'in' | string;

export interface CellInputProps {
    unit?: Unit;
    value?: string;
    variant?: Variant;
    tag?: string;
    live?: boolean;
    clearable?: boolean;
    direction?: Direction;
    disabled?: boolean;
    onChange?: (newValue: string) => void;
};

const Container = styled.section<
    React.FC<CellInputProps> & ({ inUse: boolean, isActive: boolean })
>`
    --local-gap: var(--gap, 0.5em);

    height: calc(100% - var(--local-gap));
    width: calc(100% - var(--local-gap));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: calc(var(--local-gap) / 2);
    z-index: 2;
    position: relative;

    transition: ${defaultTransition};
    
    &:hover, &:focus-within {
        z-index: 10;
        cursor: text;
    }

    &:hover > .hideaway, &:focus-within > .hideaway {
        /* opacity: 0%; */
        /* height: 0%; */
        transform: translateY(calc(-1 * calc(100% + var(--local-gap))));
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        opacity: 0.85;
        z-index: 10;
    }

    &:hover > .fade, &:focus-within > .fade {
        opacity: 0;
        pointer-events: none;
    }

    &:hover > .expand, &:focus-within > .expand {
        width: fit-content;
        max-width: 250%;
    }

    ${({ isActive }) => isActive && `
        border: 3px solid black;
    `}

    ${({ inUse, theme }) => inUse && `
        &:after {
            content: '';
            width: 0.5rem;
            height: 0.5rem;
            left: 0.5rem;
            position: absolute;
            background-color: ${theme.palette.secondary.main};
            border-radius: 50%;
        }
    `}
`;

const Input = styled.input<
    Partial<CellInputProps>
>`
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

const Value = styled.div<
    { direction: Direction, type: InputType, variant: Variant }
>`
    --local-gap: var(--gap, 0.5rem);

    width: 100%;
    min-width: 100%;
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

    ${({ direction, type }) => {
        if (direction === 'none' || type !== 'label') return;

        const dimension = ['top', 'bottom'].includes(direction) ? 'height' : 'width';

        return `
            ${dimension}: calc(100% + var(--local-gap));
            min-${dimension}: calc(100% + var(--local-gap));
            margin-${direction}: calc(var(--local-gap) * -1);
            padding-${direction}: var(--local-gap);
        `;
    }}

    // Color

    ${({ theme, variant, type }) => {
    if (type !== 'label') return;

    const backGroundColor = variant ? theme.palette[variant].main : 'lightgray';
    const text = variant ? theme.palette[variant].contrastText : 'white';

    return `
        color: ${text};
        background-color: ${backGroundColor};
        border-color: ${backGroundColor};
    `;}}
`;

const Label = styled.p`
  text-align: center;
  padding: 0 1em;
  margin: 0;
  display: flex;
  align-items: center;
`;

const Unit = styled.p`
    margin: 0 0 0 0.5rem;
    opacity: 0.5;
    font-size: 75%;
`;

export const CellInput: React.FC<CellInputProps> = ({
    clearable = false,
    disabled = false,
    live = true,
    direction = 'none',
    unit,
    variant,
    value,
    tag,
    onChange,
    ...props
}) => {
    const [rawValue, setRawValue] = useState(value);
    const scope: Object = useSelector(
        (state: RootState) => state.grid.scope,
        shallowEqual
    );
    const mode = useSelector((state: RootState) => state.view.mode);
    const activeCell = useSelector((state: RootState) => state.view.activeCell);
    const isActiveCell = activeCell?.tag === tag;

    // Handles outside inputs
    useEffect(() => {
        setRawValue(value);

        if (isActiveCell && (activeCell?.value !== value) || (activeCell?.disabled !== disabled)) {
            dispatch(setActiveCell({
                cell: {
                    ...activeCell,
                    value,
                    disabled,
                    direction,
                    variant,
                    unit
                }
            }));
        }
    }, [value, disabled]);

    const dispatch = useDispatch();

    const setCellValue = (tag: string, value: string | number) => dispatch(updateCellValue({ tag, value }));

    const updateRawValue = (value, type) => {
        let newValue = value;
        if (type === 'number' && !(isNumber(value))) {
            newValue = '';
        } else if (type === 'label') {
            setRawValue(value);
            return;
        }
        
        setRawValue(newValue);
        if (type === 'number' || live) {
            onUpdate(newValue);
        }
    };

    const onUpdate = value => {
        setCellValue(tag, value);
        if (onChange) {
            onChange(value);
        }
    }

    const type: InputType = determineType(rawValue);
    const valueText = !value ? '' : type === 'label' ? parseLabel(rawValue) : evaluate(rawValue, scope).toString();

    const onFocus = () => dispatch(setActiveCell({ cell: { unit, value: value == null ? value : valueText, variant, disabled, tag, direction }}));

    return (
        <Container inUse={mode === 'edit' && type === 'value' || value === ''} isActive={mode === 'edit' && isActiveCell}>
            <Input
                {...{...props }}
                disabled={mode !== 'edit' && disabled}
                type={type}
                variant={variant}
                value={rawValue}
                onFocus={() => onFocus()}
                onBlur={() => { onUpdate(rawValue); }}
                onChange={event => updateRawValue(event.target.value, type)}
            />
            {((type === 'function') || (type === 'label')) &&
                <Value
                    className={mode === 'edit' ? 'fade' : type === 'function' ? 'hideaway' : 'expand'}
                    title={valueText}
                    type={type}
                    variant={variant}
                    direction={direction}>
                    <Label>
                        {valueText}
                        {unit && <Unit>{unit}</Unit>}
                    </Label>
                </Value>
            }
            {clearable && <Clear onClick={() => updateRawValue('', type)}>✕</Clear>}
        </Container>
    );
};
