import { FC, useEffect } from 'react'
import { useRecoilValue, useRecoilState } from 'recoil'
import styled from 'styled-components'
import Image from 'next/image'

import { Button, NetWorkButton, NetWorkSelectorButton } from './button'
import { DropdownContainer, DefaultDropdownMenu } from './dropdown'
import WalletButton from './wallet'

import SynthetixLogo from '../public/images/logos/synthetix.svg'
import EthereumLogo from '../public/images/logos/ethereum.svg'
import OptimismLogo from '../public/images/logos/optimism.svg'
import DownArrow from '../public/images/utils/down-arrow.svg'

import { useNetwork, chain, defaultChains } from 'wagmi'
import { Network, networkState, isWalletConnectedState } from '../store/index'

const NETWORK_ICON = {
  [chain.mainnet.id]: EthereumLogo,
  [chain.optimism.id]: OptimismLogo,
}

const SUPPORTED_CHAIN: Network[] = [
  { id: chain.mainnet.id, name: chain.mainnet.name, src: EthereumLogo },
  { id: chain.optimism.id, name: chain.optimism.name, src: OptimismLogo },
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
  const { activeChain, switchNetworkAsync } = useNetwork()
  const [activeNetwork, setActiveNetwork] = useRecoilState(networkState)
  const [isWalletConnected] = useRecoilState(isWalletConnectedState)

  const onSwitchChain = async (chain) => {
    const { id, name } = chain
    if (isWalletConnected) {
      try {
        await switchNetworkAsync(id)
      } catch (error) {
        return error
      }
      
    }
    setActiveNetwork({ id: id, name: name })
  }

  return (
    <HeaderContainer>
      <div className="mt-[12px]">
        <Image src={SynthetixLogo} alt="synthetix-logo" priority={true} />
      </div>
      <MenuContainer>
        <DefaultDropdownMenu
          trigger={
            <NetWorkButton>
              <Image
                src={NETWORK_ICON[activeNetwork?.id]}
                alt={activeNetwork?.name}
                priority={true}
              />
              <span className="ml-1.25">{activeNetwork?.name}</span>
              <Image src={DownArrow} alt="down-arrow" priority={true} />
            </NetWorkButton>
          }
          dropList={
            <NetworkSelectorContainer>
              {SUPPORTED_CHAIN.map((chain) => (
                <NetworkButton
                  onClick={() => onSwitchChain(chain)}
                  isActive={chain.id === activeNetwork?.id}
                  key={chain.id}
                  {...chain}
                />
              ))}
            </NetworkSelectorContainer>
          }
        />
        <NetworkContainerDropdown></NetworkContainerDropdown>
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
