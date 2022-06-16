import {
  WagmiConfig,
  createClient,
  defaultChains,
  configureChains,
  chain,
  useNetwork
} from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { NextUIProvider, createTheme } from '@nextui-org/react'

import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const INFURA_ID = process.env.INFURA_ID

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.optimism], [
  infuraProvider({ infuraId: INFURA_ID }),
  publicProvider(),
])

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains, options: { name: 'Browser Wallet' } }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
    new InjectedConnector({
      chains,
      options: {
        name: 'Injected',
        shimDisconnect: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
})

const SNX_THEME = createTheme({
  type: 'snx',
  theme: {
    colors: {
      // brand colors
      background: 'linear-gradient(121.5deg, #101215 55.37%, #22272B 106.67%)',
      text: '#fff',
      // you can also create your own color
      // ...  more colors
    },
    space: {},
  },
})

import Header from '../components/header'
import Content from '../components/content'
import { useEffect } from 'react'

const HomePage: NextPage = () => {
  return (
    <WagmiConfig client={client}>
      {/* <NextUIProvider theme={SNX_THEME}> */}
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
      </main>
      {/* </NextUIProvider> */}
    </WagmiConfig>
  )
}

export default HomePage
