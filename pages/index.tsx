import Head from 'next/head';
import { Page } from '../layouts/Page';

export default function Home() {
  return (
    <>
      <Head>
        <title>Formulast</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page onLogin={console.log} onLogout={console.log} onCreateAccount={console.log} />
    </>
  )
}
