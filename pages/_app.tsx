import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { globalCss } from '@nextui-org/react'
import { RecoilRoot } from 'recoil'

import {
  WagmiConfig,
  createClient,
  defaultChains,
  defaultL2Chains,
  configureChains,
  chain,
  useNetwork,
} from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'

const INFURA_ID = process.env.INFURA_ID

const { chains, provider, webSocketProvider } = configureChains(
  [...defaultChains, ...defaultL2Chains],
  [infuraProvider({ infuraId: INFURA_ID }), publicProvider()]
)

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains, options: { name: 'Browser Wallet' } }),
  ],
  provider,
  webSocketProvider,
})

const globalStyle = globalCss({
  body: {
    color: '#fff',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyle()
  return (
    <WagmiConfig client={client}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </WagmiConfig>
  )
}

export default MyApp
