import { FC, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import styled from 'styled-components'
import Image from 'next/image'

import { Button, NetWorkButton, NetWorkSelectorButton } from './button'
import { DropdownContainer, DefaultDropdownMenu } from './dropdown'
import { NetworkSelector } from './NetworkSelector'
import WalletButton from './wallet'

import SynthetixLogo from '../public/images/logos/synthetix.svg'
import EthereumLogo from '../public/images/logos/ethereum.svg'
import OptimismLogo from '../public/images/logos/optimism.svg'
import DownArrow from '../public/images/utils/down-arrow.svg'

import { useNetwork, chain, } from 'wagmi'
import { Network, networkState, isWalletConnectedState } from '../store/index'

const NETWORK_ICON = {
  [chain.mainnet.id]: EthereumLogo,
  [chain.optimism.id]: OptimismLogo,
  [chain.optimismKovan.id]: OptimismLogo,
  [chain.kovan.id]: EthereumLogo,
}

const SUPPORTED_CHAIN: Network[] = [
  { id: chain.mainnet.id, name: chain.mainnet.name, src: EthereumLogo },
  { id: chain.kovan.id, name: chain.kovan.name, src: EthereumLogo },
  { id: chain.optimism.id, name: chain.optimism.name, src: OptimismLogo },
  { id: chain.optimismKovan.id, name: chain.optimismKovan.name, src: OptimismLogo },
]

function NetworkButton({ id, name, src, onClick, isActive }) {
  return (
    <NetWorkSelectorButton active={isActive} onClick={onClick}>
      <Image src={src} alt={name} />
      <span className="ml-1.25">{name}</span>
    </NetWorkSelectorButton>
  )
}

const Header = () => {
  const { switchNetworkAsync } = useNetwork()

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
