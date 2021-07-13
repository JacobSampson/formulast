import {  useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { evaluate } from '../lib/core';
import { determineType, getDirectionFromLabel, parseLabel } from '../lib/core/input-parser';
import { deleteCell, GridState, RootState, updateCellUnit, updateCellValue, updateCellVariant, ViewMode } from '../lib/store';
import { isNumber } from '../lib/util/numbers';
import { Decision, EditBar } from './EditBar';

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
    disabled?: boolean;
    onChange?: (newValue: string) => void;
};

const Container = styled.section<
    React.FC<CellInputProps> & ({ inUse: boolean })
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

    &:hover > .editbar {
        opacity: 1;
        user-select: auto;
    }

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
    unit,
    variant,
    clearable = false,
    disabled = false,
    value,
    live = true,
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

    const dispatch = useDispatch();

    const setCellValue = (tag: string, value: string | number) => dispatch(updateCellValue(tag, value));
    const setCellVariant = (tag: string, variant: Variant) => dispatch(updateCellVariant(tag, variant));
    const setCellUnit = (tag: string, value: Unit) => dispatch(updateCellUnit(tag, value))

    const onDecision = (decision, payload) => {
        switch(decision) {
            case Decision.CHANGE_CELL_TO_LABEL: {
                setRawValue('""');
                return;
            }
            case Decision.CHANGE_CELL_TO_FUNCTION: {
                setRawValue('=');
                return;
            }
            case Decision.DELETE: {
                setCellValue(tag, null);
                return;
            }
            case Decision.CHANGE_CELL_UNIT: {
                setCellUnit(tag, payload);
                return;
            }
            case Decision.CHANGE_VARIANT: {
                setCellVariant(tag, payload);
                return;
            }
        }
    }

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

    const direction = getDirectionFromLabel(rawValue);
    const type: InputType = determineType(rawValue);
    const valueText = !value ? '' : type === 'label' ? parseLabel(rawValue) : evaluate(rawValue, scope).toString();

    return (
        <Container inUse={mode === 'edit' && value != null}>
            {mode === 'edit' && <EditBar onDecision={onDecision}></EditBar>}
            <Input
                {...{...props }}
                disabled={disabled}
                type={type}
                variant={variant}
                value={rawValue}
                onBlur={() => onUpdate(rawValue)}
                onChange={event => updateRawValue(event.target.value, type)}
            />
            {((type === 'function') || (type === 'label')) &&
                <Value
                    className={mode === 'edit' ? 'fade' : type === 'function' ? 'hideaway' : ''}
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
