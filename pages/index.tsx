import { useEffect } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import styled from 'styled-components'
import Image from 'next/image'
import { useBoolean } from 'usehooks-ts'

import { NetworkSelector } from '../components/NetworkSelector'
import WalletButton from '../components/Wallet'

import SynthetixLogo from '../public/images/logos/synthetix.svg'

import Content from '../components/content'
import Footer from '../components/Footer'

import { onboard } from '../connector/config'
import { useSetRecoilState } from 'recoil'

const HomePage: NextPage = () => {
  const {
    value: visible,
    setFalse: hideWallet,
    setTrue: showWallet,
  } = useBoolean(false)

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
        <HeaderContainer>
          <div className="mt-[12px]">
            <Image src={SynthetixLogo} alt="synthetix-logo" priority={true} />
          </div>
          <MenuContainer>
            <NetworkSelector />
            <WalletButton
              visible={visible}
              hideWallet={hideWallet}
              showWallet={showWallet}
            />
          </MenuContainer>
        </HeaderContainer>
        <Content
          onTVLClick={() => {
            console.log('TVL Click')
          }}
        />
        <Footer />
      </main>
    </>
  )
}

export default HomePage

const BaseContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const HeaderContainer = styled(BaseContainer)`
  justify-content: space-between;
  padding: 26px 33px 0px 45px;
  width: 100%;
`

const MenuContainer = styled(BaseContainer)`
  justify-content: center;
  padding: 0px;
  gap: 18px;
`
