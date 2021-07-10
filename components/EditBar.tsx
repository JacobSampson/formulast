import React, { useState } from "react";
import { HiMenu, HiOutlineArrowLeft, HiTrash } from "react-icons/hi";
import { BsTextareaT } from "react-icons/bs";
import { MdFunctions } from "react-icons/md";
import styled from "styled-components";
import { defaultTransition } from "../styles/constants";

export enum Decision {
    'CHANGE_CELL_TO_LABEL',
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


const Item = styled.button<{ singular?: boolean }>`
  text-align: center;
  cursor: pointer;
  transition: ${defaultTransition};
  height: 100%;
  color: lightgray;
  background-color: white;
  border-color: lightgray;
  border-style: solid;
  border-radius: 0;
  border-width: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border-left-width: 2px;
  border-right-width: 2px;
  border-top-width: 2px;
  border-bottom-width: 2px; */
  font-size: ${({ theme }) => theme.fontSize['large']};
  height: calc(2rem + 5px);
  z-index: 50;
  filter: sepia(0%);

  /* ${({ singular }) => singular && `
    border-bottom-width: 2px;
    border-top-width: 2px;
  `} */

  :hover {
    /* background-color: rgba(211, 211, 211, 0.5); */
    background-color: lightgray;
    color: white;
    filter: sepia(60%);
  }

  :not(:first-of-type) {
      /* transform: translateY(-2px); */
      border-top-width: 0px;
  }
`;


export const EditBar: React.FC<EditBarProps> = ({
    onDecision
}) => {
    const [editing, setEditing] = useState(false);

    const createDecision = (decision: Decision) => {
        onDecision(decision);
        setEditing(false);
    }

    const options = [
        (<Item
            onClick={() => createDecision(Decision.CHANGE_CELL_TO_LABEL)}
            title={'Create Label'}>
            <BsTextareaT />
        </Item>),
        (<Item
            onClick={() => createDecision(Decision.CHANGE_CELL_TO_FUNCTION)}
            title={'Create Function'}>
            <MdFunctions />
        </Item>),
        (<Item
            onClick={() => createDecision(Decision.DELETE)}
            title={'Delete Cell'}
            style={{ color: 'white', backgroundColor: 'red', border: 'none' }}>
            <HiTrash />
        </Item>)
    ];

    return <Container
        numOptions={options.length}
        editing={editing}
        title='Open Cell Options'
        className='editbar'>
        <Item
            singular={!editing}
            onClick={() => setEditing(!editing)}>
            {!editing ? <HiMenu /> : <HiOutlineArrowLeft />}
        </Item>
        {editing && options}
    </Container>
}
