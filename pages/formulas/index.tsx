import { Layout } from '../../layouts/Layout'
import { Sheet } from '../../components/Sheet'
import { Aside } from '../../components/Aside'
import { HiStar } from 'react-icons/hi'
import { IFormula } from '../../lib/core'
import { getAllFormulaIds, getFormulaData } from '../../lib/server/services/function-parser'
import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import Link from 'next/link'
import { welcome } from '../../lib/core/language/site'
import { ResourceService } from '../../lib/server'

export interface FormulasPageProps {
  formulas: IFormula[];
  communityFormulas?: IFormula[];
}

const Title = styled.h1`

`;

const Subtitle = styled.h2`
  font-weight: 380;
`;

const Cards = styled.section`
  width: calc(100% - 4em);
  margin: 0 2em;
`;

const Card = styled.a`
  margin: 2em 0;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  padding: 1em;
  color: ${({ theme }) => theme.palette.secondary.contrastText};
  /* border-radius: 0.25em; */
  transform: scale(100%);
  display: block;
  cursor: pointer;
  transition: 0.25s ease-out;
  text-decoration: none;

  h3 {
    margin-top: 0.5em;
    font-weight: 380;
  }

  p {
    font-weight: 150;
  }

  &:hover {
    opacity: 75%;
    transform: scale(98%);
    text-decoration: none;
  }
`;

const FormulasPage: React.FC<FormulasPageProps> = ({
  formulas = [],
  communityFormulas
}) => {
  return (
    <Layout
      asides={<Aside title='How to Use' description={welcome}/>}>
      {/* <Title>Explore Formulas</Title> */}
      <Cards>
        <Subtitle>Explore</Subtitle>
        {formulas && formulas.length && formulas.map(formula => {
          const link = `/formulas/${formula.id}`;
          const description = formula.meta.description;

          return <Link href={link} key={link}>
            <Card title={formula.meta.title}>
              <h3>{formula.meta.title}</h3>
              <p>{description}</p>
            </Card>
          </Link>
        })}
        <Subtitle>Community</Subtitle>
        {communityFormulas && communityFormulas.length && communityFormulas.map(formula => {
          const link = `/community/${formula.id}`;
          const description = formula.meta.description;

          return <Link href={link} key={link}>
            <Card title={formula.meta.title}>
              <h3>{formula.meta.title}</h3>
              <p>{description}</p>
            </Card>
          </Link>
        })}
      </Cards>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const formulaIds = getAllFormulaIds();
  const formulas = await Promise.all(formulaIds.map(({ params: { id } }) => getFormulaData(id)));

  const communityFormulas = await (new ResourceService()).fetchFormulas();

  return {
    props: {
      formulas,
      communityFormulas
    }
  };
}

export default FormulasPage;
