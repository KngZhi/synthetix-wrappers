import styled from 'styled-components'
import Image from 'next/image'

import { Button } from './Button'
import { NetworkSelector } from './NetworkSelector'
import WalletButton from './Wallet'

import SynthetixLogo from '../public/images/logos/synthetix.svg'

const Header = () => {
  return (
    <HeaderContainer>
      <div className="mt-[12px]">
        <Image src={SynthetixLogo} alt="synthetix-logo" priority={true} />
      </div>
      <MenuContainer>
        <NetworkSelector />
        <WalletButton />
        <DotButton
          size="sm"
          onClick={() => console.log('You clicked on the option button!')}
        >
          <span>...</span>
        </DotButton>
      </MenuContainer>
    </HeaderContainer>
  )
}

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

const DotButton = styled(Button)`
  span {
    font-weight: 700;
    font-size: 20px;
  }
`

export default Header
