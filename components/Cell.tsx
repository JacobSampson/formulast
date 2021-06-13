import { HTMLAttributes, useRef, useState } from 'react';
import styled from 'styled-components';


interface CellStyles {
}

const StyledCell = styled.div<CellStyles>`
    height: calc(100% - 0.5em);
    width: calc(100% - 0.5em);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.25em;
    /* position: relative;
    top: 0.25em;
    left: 0.25em; */

    // Color

    &.left {
        margin-left: -0.5em;
        width: calc(100% + 0.25em);
    }

    &.right {
        margin-right: -0.5em;
        width: calc(100% + 0.25em);
    }

    &.top {
        margin-top: -0.5em;
        height: calc(100% + 0.25em);
    }

    &.bottom {
        margin-bottom: -0.5em;
        height: calc(100% + 0.25em);
    }
`;

const Input = styled.input`
  text-align: center;
  padding: 0;
  margin: 0;
`;

export interface CellProps extends CellStyles, HTMLAttributes<HTMLDivElement> {
    initialValue: any;
}

export const Cell: React.FC<CellProps> = ({
    initialValue,
    ...props
}) => {
    const [value, valueSet] = useState(initialValue);

    return (
        <StyledCell {...props}>
            <Input type='number' value={value} onChange={value => valueSet(value)} />
        </StyledCell>
    )
}
