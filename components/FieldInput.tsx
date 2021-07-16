import { useState } from "react";
import { HiPencil } from "react-icons/hi";
import styled from "styled-components"
import { defaultTransition } from "../styles/constants";

export interface FieldInputProps {
    value: string;
    onChange?: (event: any) => void;
    editable?: boolean;
    area?: boolean;
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
    height: 100%;
    position: relative;
`;

const Input = styled.input`
    font-size: inherit;
    font-family: inherit;
    border: none;
    margin: 0;
    border-radius: 0;
    width: 100%;
`;

const InputArea = styled.textarea`
    font-size: inherit;
    font-family: inherit;
    border: none;
    border-radius: 0;
    margin: 0.3rem 0;
    height: 100%;
    width: calc(100% - 2.5rem);
`;

const Icon = styled.button`
    margin-left: 1rem;
    cursor: pointer;
    text-align: center;
    transition: ${defaultTransition};
    height: 100%;
    color: lightgray;
    background-color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(0);

    &:hover {
        transform: translateY(2px);
    }
`;

export const FieldInput: React.FC<FieldInputProps> = ({
    value,
    onChange,
    editable = true,
    area = false,
    ...props
}) => {
    const [editing, setEditing] = useState(false);

    return (
        <Container>
            {editable && !area && 
                <Input
                    {...props}
                    value={value}
                    onChange={event => onChange(event)}
                />
            }
            {editable && area && 
                <InputArea
                    value={value}
                    onChange={event => onChange(event)}
                />
            }
            {!editable && <>
                {value}
                {/* {editing &&
                    <Icon onClick={() => setEditing(true)}><HiPencil /></Icon>
                } */}
            </>}
        </Container>
    );
};
