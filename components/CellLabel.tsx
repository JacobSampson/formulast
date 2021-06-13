import { HTMLAttributes } from 'react';
import styled from 'styled-components';

export type Direction = 'none' | 'left' | 'right' | 'top' | 'bottom';
export type Variant = 'primary' | 'secondary';

interface CellLabelStyles {
    direction?: Direction;
    variant?: Variant;
}

const StyledCellLabel = styled.div<CellLabelStyles>`
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

    ${({ theme, variant }) => {
        const backGroundColor = theme.palette[variant].main;
        const text = theme.palette[variant].contrastText;
    
        return `
          color: ${text};
          background-color: ${backGroundColor};
          border-color: ${backGroundColor};
        `;
    }}

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

const Label = styled.p`
  text-align: center;
  padding: 0;
  margin: 0;
`;

export interface CellLabelProps extends CellLabelStyles, HTMLAttributes<HTMLDivElement> {
    label: any;
}

export const CellLabel: React.FC<CellLabelProps> = ({
    direction = 'none',
    variant = 'secondary',
    label,
    ...props
}) => {
    return (
        <StyledCellLabel
            {...{ variant, ...props }}
            className={direction}>
            <Label>{label}</Label>
        </StyledCellLabel>
    )
}
