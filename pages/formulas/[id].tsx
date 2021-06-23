import Head from 'next/head'
import Date from '../../components/Date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllFormulaIds, getFormulaData } from '../../lib/core/function-parser'
import { FormulaMeta, IFormula } from '../../lib/models/formula'
import { Layout } from '../../layouts/Layout'
import { useDispatch } from 'react-redux'
import { loadFunction } from '../../lib/store'
import { Sheet } from '../../components/Sheet'
import { Aside } from '../../components/Aside'
import { HiStar } from 'react-icons/hi'
import { explanation } from '../../lib/core/language/site'

export interface FormulaPageProps {
  formula: IFormula;
}

const FormulaPage: React.FC<FormulaPageProps> = ({
    formula
}) => {
  const dispatch = useDispatch();
  dispatch(loadFunction(formula.cells, formula.meta));

  return (
    <Layout
      onLogin={console.log}
      onLogout={console.log}
      onCreateAccount={console.log}
      asides={(<>
        <Aside title='How to Use' description={explanation}/>
        {/* <Aside title='Floating Number Converter' description='Input the values into the top and the output will display at the bottom'>
          <HiStar />
        </Aside> */}
      </>)}>
      <Sheet />
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllFormulaIds();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const formula = await getFormulaData(params.id as string)
  return {
    props: {
      formula
    }
  }
}

export default FormulaPage;