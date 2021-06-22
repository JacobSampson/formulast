import React from 'react';
import { HiStar } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Aside } from '../components/Aside';
import { Header } from '../components/Header';
import { Sheet } from '../components/Sheet';
import { loadFunction } from '../lib/store';

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
  grid-template-columns: 1fr 20em;
  grid-gap: 3em;
  overflow: hidden;

  @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.xsmall}) {
    width: 100%;
  }
`;

const StyledHeader = styled(Header)`
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
}) => {  
  return (
    <Container>
      <StyledHeader user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />
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
};
