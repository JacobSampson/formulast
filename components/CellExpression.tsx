import { MathExpression } from 'mathjs';
import styled from 'styled-components';
import { evaluate } from '../lib/core';

export type Direction = 'none' | 'left' | 'right' | 'top' | 'bottom';
export type Variant = 'primary' | 'secondary';

export interface CellExpressionProps {
    direction?: Direction;
    variant?: Variant;
    expression: string | number;
}

const Container = styled.div<Partial<CellExpressionProps>>`
    --local-gap: var(--gap, 0.5em);

    /* height: calc(100% - var(--local-gap));
    width: calc(100% - var(--local-gap)); */
    display: flex;
    align-items: center;
    justify-content: center;
    margin: calc(var(--local-gap) / 2);
    position: relative;
    z-index: -5;

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

    ${({ direction }) => {
        if (direction === 'none') return;

        const dimension = ['top', 'bottom'].includes(direction) ? 'height' : 'width';

        return `
            margin-${direction}: calc(var(--local-gap) * -1);
            ${dimension}: calc(100% + calc(var(--local-gap) / 2));
            
            > * {
                margin-${direction}: var(--local-gap);
            }
        `;
    }}
`;

const Label = styled.p`
  text-align: center;
  padding: 0;
  margin: 0;
`;

export const CellExpression: React.FC<CellExpressionProps> = ({
    direction = 'none',
    variant = 'secondary',
    expression,
    ...props
}) => {
    const computedValue = evaluate(expression as any as MathExpression);

    return (
        <Container
            {...{ variant, direction, ...props }}>
            <Label>{computedValue}</Label>
        </Container>
    )
};
