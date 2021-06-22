import Head from 'next/head'
import Date from '../../components/Date'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getAllFunctionIds, getFunctionData } from '../../lib/core/function-parser'
import { FunctionMeta, IFunction } from '../../lib/models/function'
import { Page } from '../../layouts/Page'
import { useDispatch } from 'react-redux'
import { loadFunction } from '../../lib/store'

export interface FunctionPageProps {
  functionData: IFunction;
}

const FunctionPage: React.FC<FunctionPageProps> = ({
    functionData
}) => {
  const dispatch = useDispatch();
  dispatch(loadFunction(functionData.cells, functionData.meta));

  return (
    <Page onLogin={console.log} onLogout={console.log} onCreateAccount={console.log} />
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllFunctionIds();
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const functionData = await getFunctionData(params.id as string)
  return {
    props: {
        functionData
    }
  }
}

export default FunctionPage;
