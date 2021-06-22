import React from 'react';
import { HiStar } from 'react-icons/hi';
import styled from 'styled-components';
import { Aside } from './Aside';
import { Header } from './Header';
import { Sheet } from './Sheet';

export interface PageProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

const Body = styled.div`
  max-width: 100em;
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 15em;
  grid-gap: 3em;

  @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.xsmall}) {
    width: 100%;
  }
`;

const Asides = styled.aside`
  display: flex;
  grid-gap: 1em;
  flex-direction: column;
  width: 100%;
`;

const Container = styled.div`

`;

export const Page: React.FC<PageProps> = ({
  user,
  onLogin,
  onLogout,
  onCreateAccount
}) => (
  <Container>
    <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />
    <Body>
      <Sheet />
      <Asides>
        <Aside title='How to Use' description='Input the values into the top and the output will display at the bottom'/>
        <Aside title='Floating Number Converter' description='Input the values into the top and the output will display at the bottom'>
          <HiStar />
        </Aside>
      </Asides>
    </Body>
  </Container>
);
