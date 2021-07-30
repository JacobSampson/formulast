import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllFormulaIds, getFormulaData } from '../../lib/server/services/function-parser'
import { Layout } from '../../layouts/Layout'
import { useDispatch } from 'react-redux'
import { Sheet } from '../../components/Sheet'
import { Aside } from '../../components/Aside'
import { explanation } from '../../lib/core/language/site'
import { IFormula } from '../../lib/core'
import { loadFormula } from '../../lib/client/store'

export interface FormulaPageProps {
  formula: IFormula;
}

const FormulaPage: React.FC<FormulaPageProps> = ({
    formula
}) => {
  const dispatch = useDispatch();
  dispatch(loadFormula({ cells: formula.cells, meta: formula.meta }));

  return (
    <Layout
      asides={(<>
        <Aside title='How to Use' description={explanation}/>
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
