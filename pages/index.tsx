import type { NextPage } from 'next'
import Head from 'next/head'

import Header from '../components/header'
import Content from '../components/content'
import Footer from "../components/Footer";
import { useEffect } from 'react'

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Synthetix Wrapper</title>
        <meta
          name="description"
          content="Simple user interface that allows to interact with the various Synthetix Wrapper contracts"
        />
        <link rel="icon" href="/images/logos/synthetix.svg" />
      </Head>
      <main>
        <Header></Header>
        <Content></Content>
        <Footer />
      </main>
    </>
  )
}

export default HomePage
