import styled from 'styled-components';

export type Direction = 'none' | 'left' | 'right' | 'top' | 'bottom';
export type Variant = 'primary' | 'secondary';

export interface CellLabelProps {
    direction?: Direction;
    variant?: Variant;

    label: any;
}

const Container = styled.div<Partial<CellLabelProps>>`
    --local-gap: var(--gap, 0.5em);

    height: calc(100% - var(--local-gap));
    width: calc(100% - var(--local-gap));
    display: flex;
    align-items: center;
    justify-content: center;
    margin: calc(var(--local-gap) / 2);
    position: relative;
    z-index: 5;

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
            ${dimension}: calc(100% + calc(var(--local-gap) / 2) - 4px);
            
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

export const CellLabel: React.FC<CellLabelProps> = ({
    direction = 'none',
    variant = 'secondary',
    label,
    ...props
}) => {
    return (
        <Container
            {...{ variant, direction, ...props }}>
            <Label>{label}</Label>
        </Container>
    )
};
