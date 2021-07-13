import { useState } from "react";
import { HiMinus, HiPlusSm, HiX } from "react-icons/hi";
import styled from "styled-components";
import { defaultTransition } from "../styles/constants";
import { FieldInput } from "./FieldInput";

export interface PillProps {
    value?: string;
    onAction?: (event?: any) => void;
    editable?: boolean;
    add?: boolean;
}

const Container = styled.div`
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    border-radius: 2em;
    padding: 0.25em 1em;
    display: flex;
    gap: 0.5em;
    height: 1.5rem;
    padding: 0.25rem;
`;

const Input = styled(FieldInput)`
    background-color: transparent !important;
    border-bottom: 2px solid white;
    border-radius: 0;
    color: white;
    margin-left: 0.5rem;
`;

const Icon = styled.button`
    border: 0;
    padding: 0;
    background-color: transparent;
    color: white;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.15rem;

    transition: ${defaultTransition};

    &:hover {
        cursor: pointer;
        color: ${({ theme }) => theme.palette.primary.main};
        background-color: white;
    }
`;

const Label = styled.div`
    margin: 0 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Pill: React.FC<PillProps> = ({
    value,
    onAction,
    editable = false,
    add = false
}) => {
    const [newValue, setNewValue] = useState('');

    const onAdd = newValue => {
        setNewValue('');
        onAction(newValue);
    }

    return (
        <Container>
            {add &&
                <>
                    <Input
                        value={newValue}
                        onChange={event => setNewValue(event.target.value)}
                        editable
                    />
                    <Icon onClick={() => onAdd(newValue)}>
                        <HiPlusSm />
                    </Icon>
                </>
            }
            {!add && editable && 
                <>
                    <Label>{value}</Label>
                    <Icon onClick={_ => onAction()}>
                        <HiX />
                    </Icon>
                </>
            }
            {!add && !editable && <Label>{value}</Label>}
        </Container>
    );
}
