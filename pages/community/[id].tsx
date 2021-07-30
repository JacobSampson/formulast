import { IFormula } from '../../lib/core'
import { Layout } from '../../layouts/Layout'
import { useDispatch } from 'react-redux'
import { loadFormula } from '../../lib/client'
import { Sheet } from '../../components/Sheet'
import { Aside } from '../../components/Aside'
import { explanation } from '../../lib/core/language/site'
import { ResourceService, TableType } from '../../lib/server/services/resource-service'

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
        <Aside title='Community' description={explanation}/>
      </>)}>
      <Sheet />
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const formula = await (new ResourceService()).fetchFormulaById(params.id as string, TableType.FORMULAS);
  return {
    props: {
      formula
    }
  }}

export default FormulaPage;
