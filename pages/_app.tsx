import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { globalCss } from "@nextui-org/react";

const globalStyle = globalCss({
  body: {
    color: '#fff'
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  globalStyle()
  return <Component {...pageProps} />
}

export default MyApp
