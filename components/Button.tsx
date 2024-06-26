import React from 'react';
import styled from 'styled-components';
import { Size, defaultTransition } from '../styles/constants';

export type Variant = 'primary' | 'secondary';

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  active?: boolean;
  square?: boolean;
  label?: string;
  onClick?: () => void;
};

const Container = styled.button<Partial<ButtonProps>>`
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
  box-shadow: 0.25em 0.25em 0.125em ${({ theme }) => theme.shadow.light};
  :hover {
    transform: translateY(0.125em);
    box-shadow: 0.125em 0.125em 0px ${({ theme }) => theme.shadow.light};
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
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`;

export const Button: React.FC<ButtonProps & React.PropsWithChildren> = ({
  variant = 'secondary',
  size = 'medium',
  active = true,
  square = false,
  label,
  children,
  ...props
}) => {
  return (
    <Container type='button' {...{ variant, size, active, square, ...props }}>
      <Label>{children}{label}</Label>
    </Container>
  );
};
