import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

export interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 150;
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  letter-spacing: 0.25em;

  svg {
    margin-right: 0.5em;
  }

  ::after {
    content: '';
    width: 3em;
    height: 0.75em;
    display: block;
    position: absolute;
    bottom: 0.75em;
    right: -0.5em;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
  }
`;

const Bar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5em solid ${({ theme }) => theme.palette.primary.main};
  padding: 0 3em;

  @media screen and (max-width: ${({ theme }) => theme.screen.xsmall}) {
    display: flex;
    justify-content: center;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > *:not(:last-of-type) {
      margin-right: 1em;
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.xsmall}) {
    display: none;
  }
`;

const Container = styled.header`
`;

const StyledImage = styled(Image)`
`;

const StyledLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.common.black};
  cursor: grab;

  &:hover {
    text-decoration: none;
  }
`;

const InteractiveLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.palette.common.black};
  cursor: grab;
  font-size: ${({ theme }) => theme.fontSize.large};
  font-weight: 100;
  margin: 0 1em;
  position: relative;

  &:after {
    content: '';
    display: block;
    width: 0%;
    height: 0.05em;
    background-color: ${({ theme }) => theme.palette.common.black};
    position: absolute;
    bottom: 0;
    left: 0;
    transition: all 0.15s ease-in-out;
  }

  &:hover {
    opacity: 80%;
    text-decoration: none;
  }

  &:hover:after {
    opacity: 80%;
    width: 100%;
  }
`;

export const Header: React.FC<HeaderProps> = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount
}) => (
  <Container>
    <Bar>
      <Link href='/'>
        <StyledLink>
          <Title>
            <StyledImage
              priority
              src='/images/logo.svg'
              height={'100%'}
              width={'100%'}
              alt={'Formulast Logo'}
            />
            FORMULAST
          </Title>
        </StyledLink>
      </Link>

      <Buttons>
        <Link href='/formulas'>
          <InteractiveLink>
            explore
          </InteractiveLink>
        </Link>
        {/* TODO: Remove */}
        {false && (user ? (
          <Button size='medium' onClick={onLogout} square label='log out' />
        ) : (
          <>
            <Button size='medium' label='log in' square active={false} />
            <Button size='medium' label='create account' square />
          </>
        ))}
      </Buttons>
    </Bar>


  </Container>
);
