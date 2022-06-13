import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { globalCss } from '@nextui-org/react'
import { RecoilRoot } from 'recoil'

const globalStyle = globalCss({
  body: {
    color: '#fff',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyle()
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
