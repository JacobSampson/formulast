import Head from 'next/head';
import { Layout } from '../layouts/Layout';

export default function Home() {
  return (
    <>
      <Head>
        <title>Formulast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout onLogin={console.log} onLogout={console.log} onCreateAccount={console.log} />
    </>
  )
}
