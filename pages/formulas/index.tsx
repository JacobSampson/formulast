import { Layout } from '../../layouts/Layout'
import { Sheet } from '../../components/Sheet'
import { Aside } from '../../components/Aside'
import { HiStar } from 'react-icons/hi'
import { IFormula } from '../../lib/models/formula'
import { getAllFormulaIds, getFormulaData } from '../../lib/core/function-parser'
import { useEffect, useState } from 'react'
import { GetStaticProps } from 'next'
import styled from 'styled-components'
import Link from 'next/link'
import { welcome } from '../../lib/core/language/site'

export interface FormulasPageProps {
  formulas: IFormula[];
}

const Title = styled.h2`
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
  border-radius: 0.25em;
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
  formulas = []
}) => {
  return (
    <Layout
      onLogin={console.log}
      onLogout={console.log}
      onCreateAccount={console.log}
      asides={<Aside title='How to Use' description={welcome}/>}>
      <Cards>
        <Title>Explore</Title>
        {formulas && formulas.length && formulas.map(formula => {
          const link = `/formulas/${formula.id}`;
          return <Link href={link}>
            <Card title={formula.meta.title}>
              <h3>{formula.meta.title}</h3>
              <p>{formula.meta.description}</p>
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
  return {
    props: {
      formulas
    }
  };
}

export default FormulasPage;
