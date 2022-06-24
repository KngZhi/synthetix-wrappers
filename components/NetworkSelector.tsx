import { FC, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { chain, useNetwork } from 'wagmi'
import { useRecoilValue, useRecoilState } from 'recoil'

import { DefaultDropdownMenu } from './dropdown'
import { NetWorkButton, NetWorkSelectorButton } from './button'

import { Network, networkState, isWalletConnectedState } from '../store/index'

import EthereumLogo from '../public/images/logos/ethereum.svg'
import OptimismLogo from '../public/images/logos/optimism.svg'
import DownArrow from '../public/images/utils/down-arrow.svg'

type NetworkButtonProps = {
  id: string
  name: string
  src: any
  onClick: () => void
  isActive: boolean
}

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
  {
    id: chain.optimismKovan.id,
    name: chain.optimismKovan.name,
    src: OptimismLogo,
  },
]

const NetworkButton: FC<NetworkButtonProps> = ({
  name,
  src,
  onClick,
  isActive,
}) => {
  return (
    <NetWorkSelectorButton active={isActive} onClick={onClick}>
      <Image src={src} alt={name} />
      <span className="ml-1.25">{name}</span>
    </NetWorkSelectorButton>
  )
}

type NetworkSelectorProps = {
  menuCls?: string
  dropdownCls?: string
  containerCls?: string
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({
  menuCls,
  dropdownCls,
  containerCls,
}) => {
  const [activeNetwork, setActiveNetwork] = useRecoilState(networkState)
  const { switchNetworkAsync, activeChain } = useNetwork()
  const isWalletConnected = useRecoilValue(isWalletConnectedState)

  const onSwitchChain = async (chain: Network) => {
    const { id, name } = chain
    if (isWalletConnected && switchNetworkAsync) {
      try {
        await switchNetworkAsync(id)
      } catch (error) {
        return error
      }
    } else {
      setActiveNetwork({ id, name })
    }
  }

  useEffect(() => {
    if (activeChain) {
      setActiveNetwork({ id: activeChain.id, name: activeChain.name })
    }
  }, [activeChain, setActiveNetwork])

  return (
    <DefaultDropdownMenu
      className={containerCls}
      triggerCls={menuCls}
      dropdownCls={dropdownCls}
      trigger={
        <NetWorkButton>
          <Image
            src={NETWORK_ICON[activeNetwork?.id]}
            alt={activeNetwork.name}
            priority={true}
          />
          <span className="ml-1.25">{activeNetwork.name}</span>
          <Image src={DownArrow} alt="down-arrow" priority={true} />
        </NetWorkButton>
      }
      dropList={
        <NetworkSelectorContainer>
          {SUPPORTED_CHAIN.map((chain) => (
            <NetworkButton
              src={NETWORK_ICON[chain.id]}
              onClick={() => onSwitchChain(chain)}
              isActive={chain.id === activeNetwork.id}
              key={chain.id}
              {...chain}
            />
          ))}
        </NetworkSelectorContainer>
      }
    />
  )
}

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
