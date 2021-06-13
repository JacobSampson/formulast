import React from 'react';
import styled from 'styled-components';
import { Size, defaultTransition } from '../styles/constants';

export type Variant = 'primary' | 'secondary';

interface ButtonStyles {
  variant?: Variant;
  size?: Size;
  active?: boolean;
  square?: boolean;
}

const StyledButton = styled.button<ButtonStyles>`
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  transition: ${defaultTransition};

  // Size

  font-size: ${({ theme, size }) => theme.fontSize[size]};
  border: solid 0.1em;
  border-radius: ${({ square }) => square ? '0px' : '2em'};
  padding: 0.5em 1em;
  gap: 0.5em;

  box-shadow: 0.33em 0.33dm 0.16em ${({ theme }) => theme.shadow.light};
  :hover {
    transform: translateY(0.16em);
    box-shadow: 0.16em 0.16em 0px ${({ theme }) => theme.shadow.light};
  }

  // Color

  ${({ variant, theme, active }) => {
    const backGroundColor = theme.palette[variant].main;
    const text = theme.palette[variant].contrastText;

    if (!active) {
      return `
        color: ${backGroundColor};
        background-color: ${text};
        border-color: ${backGroundColor};
      `;
    }

    return `
      color: ${text};
      background-color: ${backGroundColor};
      border-color: ${backGroundColor};
    `;
  }}
`;

const Label = styled.p`
  text-align: center;
  padding: 0;
  margin: 0;
`;

export interface ButtonProps extends ButtonStyles {
  label: string;
  onClick?: () => void;
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'medium',
  active = true,
  square = false,
  label,
  ...props
}) => {
  return (
    <StyledButton type='button' {...{ variant, size, active, square, ...props }}>
      <Label>{label}</Label>
    </StyledButton>
  );
};
