import Head from 'next/head';
import React from 'react';
import { HiStar } from 'react-icons/hi';
import styled from 'styled-components';
import { Aside } from '../components/Aside';
import { Header } from '../components/Header';

export interface LayoutProps {
  asides?: any;
}

const Body = styled.div`
  max-width: 100em;
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 20em;
  grid-gap: 3em;

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
  margin: 0 auto;

  @media screen and (max-width: ${({ theme }) => theme.screen.medium}) {
    width: calc(100% - 4em);
  }

  @media screen and (max-width: ${({ theme }) => theme.screen.small}) {
    width: 100%;
  }
`;

const Container = styled.body`

`;

const name = 'Jacob Sampson'
export const siteTitle = 'formulast'

export const Layout: React.FC<LayoutProps & React.PropsWithChildren> = ({
  asides,
  children
}) => {  
  return (
    <Container>
      <Head>
        <title>Formulast</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Hundreds of formulas"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <StyledHeader />
      <Body>
        {children}
        <Asides>{asides}</Asides>
      </Body>
    </Container>
  );
};

export default Layout;
