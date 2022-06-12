import { FC } from 'react'
import styled, { css } from 'styled-components'
import Image from 'next/image'

import { Button, NetWorkButton, NetWorkSelectorButton } from './button.tsx'
import DropdownContainer from './dropdown'
import WalletButton from "./wallet";

import SynthetixLogo from '../public/images/logos/synthetix.svg'
import EthereumLogo from '../public/images/logos/ethereum.svg'
import OptimismLogo from '../public/images/logos/optimism.svg'
import DownArrow from '../public/images/utils/down-arrow.svg'
import BadgeLive from '../public/images/utils/badge-live.svg'

type HeaderProps = {
  onConnect: () => void
}

const Header: FC<HeaderProps> = ({ onConnect }) => {
  return (
    <HeaderContainer>
      <div className="mt-[12px]">
        <Image src={SynthetixLogo} alt="synthetix-logo" priority={true} />
      </div>
      <MenuContainer>
        <NetworkContainerDropdown>
          <NetWorkButton
            onClick={() => console.log('You clicked on the network button!')}
          >
            <Image src={EthereumLogo} alt="ethereum-logo" priority={true} />
            <span className="ml-1.25">Ethereum</span>
            <Image src={DownArrow} alt="down-arrow" priority={true} />
          </NetWorkButton>
          <NetworkSelectorContainer>
            <NetWorkSelectorButton>
              <Image src={OptimismLogo} alt="optimism-logo" priority={true} />
              <span className="ml-1.25">Optimism</span>
            </NetWorkSelectorButton>
            <NetWorkSelectorButton active={true}>
              <Image src={EthereumLogo} alt="optimism-logo" priority={true} />
              <span className="ml-1.25">Ethereum</span>
            </NetWorkSelectorButton>
          </NetworkSelectorContainer>
        </NetworkContainerDropdown>
        <WalletButton />
        {/* <ConnectWalletButton onClick={onConnect}>
          <span>Connect Wallet</span>
        </ConnectWalletButton> */}
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

const NetworkContainer = styled(BaseContainer)`
  justify-content: center;
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

const NetworkSelectorContainer = styled.div`
  background: linear-gradient(121.5deg, #101215 55.37%, #22272b 106.67%);
  position: absolute;
  margin-top: 54px;
  padding: 8px;
  gap: 2px;

  width: 160px;

  border: 1px solid #8282954d;
  border-radius: 4px;
`

const NetworkContainerDropdown = styled(DropdownContainer)`
  flex-direction: column;
  gap: 8px;
`


const DotButton = styled(Button)`
  span {
    font-weight: 700;
    font-size: 20px;
  }
`

export default Header
