import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { ConnectorContextProvider } from '../connector'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConnectorContextProvider>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ConnectorContextProvider>
  )
}

export default MyApp
