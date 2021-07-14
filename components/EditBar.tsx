import React, { useRef, useState } from "react";
import { HiLockClosed, HiMenu, HiOutlineArrowLeft, HiOutlineColorSwatch, HiOutlineEye, HiOutlineEyeOff, HiOutlineLockClosed, HiOutlineLockOpen, HiTrash, HiX } from "react-icons/hi";
import { AiOutlineNumber } from "react-icons/ai";
import { BsTextareaT } from "react-icons/bs";
import { MdFunctions } from "react-icons/md";
import styled from "styled-components";
import { defaultTransition } from "../styles/constants";
import { FieldInput } from "./FieldInput";
import { useDispatch, useSelector } from "react-redux";
import { deleteCell, RootState, updateCellMeta, updateCellValue } from "../lib/store";
import { InputType, Unit, Variant } from "./CellInput";

export enum Decision {
    'CHANGE_CELL_TO_LABEL',
    'CHANGE_VARIANT',
    'CHANGE_CELL_UNIT',
    'CHANGE_CELL_TO_FUNCTION',
    'DELETE'
}

export interface EditBarProps {
}

const Container = styled.div<{ disabled?: boolean }>`
    text-align: center;
    transition: ${defaultTransition};
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr));
    grid-template-rows: repeat(auto-fit, minmax(2.5rem, 1fr));
    grid-auto-flow: dense;
    width: 100%;
    left: 0;
    grid-auto-rows: 1fr;

    animation: 0.25s ease-out 0s 1 popin;

    ${({ disabled }) => disabled && `
        user-select: none;
        pointer-events: none;
        cursor: default;
        opacity: 0.5;
    `}
`;


const Item = styled.button<
    { singular?: boolean, variant?: 'primary' | 'secondary', disabled?: boolean }
>`
  /* ${({ singular }) => singular && `
    border-bottom-width: 2px;
    border-top-width: 2px;
  `} */
  background-color: white;
  border: none;
  height: 100%;
  width: 100%;
  text-align: center;
  cursor: pointer;
  color: lightgray;
  border-width: 0;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  min-width: 2.5rem;

  cursor: pointer;
  transition: ${defaultTransition};

  :hover {
    /* background-color: rgba(211, 211, 211, 0.5); */
    background-color: lightgray;
    color: white;
    filter: sepia(60%);
  }

  ${({ disabled }) => disabled && `
    user-select: none;
    pointer-events: none;
    cursor: default;
  `}

  background-color: ${({ variant, theme }) => {
    if (!variant) return 'white';

    switch(variant) {
        case 'primary': {
            return theme.palette.primary.main;
        }
        case 'secondary': {
            return theme.palette.secondary.main;
        }
        default: {
            return 'lightgray';
        }
    }
  }};
`;

const Input = styled(FieldInput)<{ placeholder?: string, maxLength: number }>`
    color: black;
    flex-grow: 1;
    width: 100%;
    height: 100%;
    font-size: ${({ theme }) => theme.fontSize.medium};
    padding-left: 0.5rem;
`;

const Field = styled.div`
  grid-column: span 1;
  text-align: center;
  cursor: pointer;
  color: lightgray;
  border-color: lightgray;
  border-style: solid;
  border-radius: 0;
  border-width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* border-left-width: 2px;
  border-right-width: 2px;
  border-top-width: 2px;
  border-bottom-width: 2px; */
  font-size: ${({ theme }) => theme.fontSize['large']};
  height: 100%;
  z-index: 50;
  filter: sepia(0%);

  :not(:first-of-type) {
      /* transform: translateY(-2px); */
      border-left-width: 0px;
  }
`;

const Label = styled.p<{ variant?: Variant, locked?: boolean }>`
    grid-column: span 4;
    margin: 0;
    position: relative;
    color: lightgray;
    justify-content: center;
    display: flex;
    align-items: center;
    border: 2px solid lightgray;
    border-right-width: 0px;
    font-size: ${({ theme }) => theme.fontSize.medium};

    color: rgba(0, 0, 0, 0.5);
    background-color: white;

    /* ${({ theme, variant }) => {
    const backGroundColor = variant ? theme.palette[variant].main : 'lightgray';
    const text = variant ? theme.palette[variant].contrastText : 'white';

    return `
        color: ${text};
        background-color: ${backGroundColor};
        border-color: ${backGroundColor};
    `;}} */
`;

const Lock = styled(HiLockClosed)`
    position: absolute;
    left: 0.5rem;
`;

export const EditBar: React.FC<EditBarProps> = ({

}) => {
    const [unit, setUnit] = useState('');

    const dispatch = useDispatch();
    const cell = useSelector((state: RootState) => state.view.activeCell);
    const tag = cell?.tag;

    const onCellValueChange = () => dispatch(updateCellValue(tag, ''));
    const onCreateLabel = () => dispatch(updateCellValue(tag, '""'));
    const onCreateFunction = () => dispatch(updateCellValue(tag, '='));
    const onDelete = () => dispatch(deleteCell(tag));
    const onMetaChange = payload => dispatch(updateCellMeta(tag, { ...cell, ...payload }));

    const options = [
        (<Field>
            <Item
                onClick={() => onCreateLabel()}
                title={'Create Label'}>
                <BsTextareaT />
            </Item>
        </Field>),
        (<Field>
            <Item
                onClick={() => { onCreateFunction(); onMetaChange({ disabled: true }); }}
                title={'Create Function'}>
                <MdFunctions />
            </Item>
        </Field>),
        (<Field style={{ gridColumn: 'span 3' }}>
            <Input
                placeholder={"unit"}
                maxLength={4}
                value={unit}
                editable
                onChange={event => setUnit(event.target.value)}
            />
            <Item
                style={{ width: '2.5rem', zIndex: 1 }}
                onClick={() => onMetaChange({ unit })}
                title={'Set Units'}>
                <AiOutlineNumber />
            </Item>
        </Field>),
        (<Field style={{ gridColumn: 'span 3' }}>
            {/* <Item
                disabled
                title={'Set Variant'}>
                <HiOutlineColorSwatch />
            </Item> */}
            <Item
                variant='primary'
                onClick={() => onMetaChange({ variant: 'primary' })}
                title={'Set Primary'}>
            </Item>
            <Item
                variant='secondary'
                onClick={() => onMetaChange({ variant: 'secondary'})}
                title={'Set Secondary'}>
            </Item>
            <Item
                onClick={() => onMetaChange({ variant: null })}
                title={'Remove Variance'}>
                <HiX />
            </Item>
        </Field>),
        (<Field>
            <Item
                onClick={() => onMetaChange({ disabled: cell.disabled == null || !cell.disabled })}
                title={'Toggle Cell Lock'}>
                {cell && cell.disabled ? <HiOutlineLockClosed /> : <HiOutlineLockOpen />}
            </Item>
        </Field>),
        (<Field>
            <Item
                onClick={() => onCellValueChange()}
                disabled={!(cell && (cell.value == null))}
                title={'Toggle Cell Use'}>
                {cell && (cell.value == undefined) ? <HiOutlineEye /> : <HiOutlineEyeOff />}
            </Item>
        </Field>),
        (<Field>
            <Item
                onClick={() => onDelete()}
                title={'Delete Cell'}
                style={{ color: 'white', backgroundColor: 'red', border: 'none' }}>
                <HiTrash />
            </Item>
        </Field>)
    ];

    return <Container
        disabled={!cell}
        title='Open Cell Options'
        className='editbar'>
        {cell &&
            <Label
                variant={cell.variant}>
                {cell.value}
                {cell.disabled && <Lock />}
            </Label>
        }
        {options}
    </Container>
}
