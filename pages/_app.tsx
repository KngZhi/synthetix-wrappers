import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'

import {
  WagmiConfig,
  createClient,
  defaultChains,
  defaultL2Chains,
  configureChains,
} from 'wagmi'

import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import { MetaMaskConnector } from 'wagmi/connectors/metaMask'

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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </WagmiConfig>
  )
}

export default MyApp
