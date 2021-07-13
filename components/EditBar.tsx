import React, { useRef, useState } from "react";
import { HiMenu, HiOutlineArrowLeft, HiOutlineColorSwatch, HiTrash } from "react-icons/hi";
import { AiOutlineNumber } from "react-icons/ai";
import { BsTextareaT } from "react-icons/bs";
import { MdFunctions } from "react-icons/md";
import styled from "styled-components";
import { defaultTransition } from "../styles/constants";
import { FieldInput } from "./FieldInput";

export enum Decision {
    'CHANGE_CELL_TO_LABEL',
    'CHANGE_VARIANT',
    'CHANGE_CELL_UNIT',
    'CHANGE_CELL_TO_FUNCTION',
    'DELETE'
}

export interface EditBarProps {
    onDecision: (decision: Decision, payload?: any) => void;
}

const Container = styled.div<{ editing: boolean, numOptions: number }>`
    text-align: center;
    cursor: pointer;
    transition: ${defaultTransition};
    display: grid;
    grid-template-columns: 2.5em;
    position: absolute;
    height: 100%;
    left: 0;
    opacity: 0;

    ${({ editing }) => editing && `
        opacity: 1;
        width: 100%;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(${({ numOptions }) => numOptions + 1}, 1fr);
    `}
`;


const Item = styled.button<
    { singular?: boolean, variant?: 'primary' | 'secondary' }
>`
  /* ${({ singular }) => singular && `
    border-bottom-width: 2px;
    border-top-width: 2px;
  `} */
  background-color: white;
  border: none;
  height: 100%;
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

  transition: ${defaultTransition};

  :hover {
    /* background-color: rgba(211, 211, 211, 0.5); */
    background-color: lightgray;
    color: white;
    filter: sepia(60%);
  }

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

const Input = styled(FieldInput)`
    color: black;
    flex-grow: 1;
    border-left: 2px solid lightgray;
    height: 100%;
`;

const Field = styled.div`
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
  height: calc(2rem + 5px);
  z-index: 50;
  filter: sepia(0%);

  :not(:first-of-type) {
      /* transform: translateY(-2px); */
      border-top-width: 0px;
  }
`;


export const EditBar: React.FC<EditBarProps> = ({
    onDecision
}) => {
    const [editing, setEditing] = useState(false);
    const [unit, setUnit] = useState('');
    const editBar = useRef(null)

    const createDecision = (decision: Decision, payload?: any) => {
        onDecision(decision, payload);
    }

    const createUpdateUnitDecision = newUnit => {
        setUnit('');
        createDecision(Decision.CHANGE_CELL_UNIT, newUnit);
    };

    const options = [
        (<Field>
            <Item
                onClick={() => createDecision(Decision.CHANGE_CELL_TO_LABEL)}
                title={'Create Label'}>
                <BsTextareaT />
            </Item>
        </Field>),
        (<Field>
            <Item
                onClick={() => createDecision(Decision.CHANGE_CELL_TO_FUNCTION)}
                title={'Create Function'}>
                <MdFunctions />
            </Item>
        </Field>),
        (<Field>
            <Item
                onClick={() => createUpdateUnitDecision(unit)}
                title={'Set Units'}>
                <AiOutlineNumber />
            </Item>
            <Input
                value={unit}
                editable
                onChange={event => setUnit(event.target.value)}
            />
        </Field>),
        (<Field>
            <Item
                onClick={() => createUpdateUnitDecision(unit)}
                title={'Set Variant'}>
                <HiOutlineColorSwatch />
            </Item>
            <Item
                variant='primary'
                onClick={() => createDecision(Decision.CHANGE_VARIANT, 'primary')}
                title={'Set Primary'}>
            </Item>
            <Item
                variant='secondary'
                onClick={() => createDecision(Decision.CHANGE_VARIANT, 'secondary')}
                title={'Set Secondary'}>
            </Item>
            <Item
                onClick={() => createDecision(Decision.CHANGE_VARIANT)}
                title={'Remove Variance'}>
            </Item>
        </Field>),
        (<Field>
            <Item
                onClick={() => { setEditing(false); createDecision(Decision.DELETE) }}
                title={'Delete Cell'}
                style={{ color: 'white', backgroundColor: 'red', border: 'none' }}>
                <HiTrash />
            </Item>
        </Field>)
    ];

    return <Container
        onMouseLeave={() => setEditing(false)}
        numOptions={options.length}
        editing={editing}
        title='Open Cell Options'
        className='editbar'>
        <Field>
            <Item
                singular={!editing}
                onClick={() => setEditing(!editing)}>
                {!editing ? <HiMenu /> : <HiOutlineArrowLeft />}
            </Item>
        </Field>
        {editing && options}
    </Container>
}
