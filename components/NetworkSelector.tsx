import { FC, useEffect } from 'react'
import styled from 'styled-components'
import Image, { StaticImageData } from 'next/image'
import { chain, useNetwork, useSwitchNetwork } from 'wagmi'
import { useRecoilValue, useRecoilState } from 'recoil'

import { DefaultDropdownMenu } from './Dropdown'
import { NetWorkButton, NetWorkSelectorButton } from './Button'

import { Network, networkState, isWalletConnectedState } from '../store/index'

import EthereumLogo from '../public/images/logos/ethereum.svg'
import OptimismLogo from '../public/images/logos/optimism.svg'
import DownArrow from '../public/images/utils/down-arrow.svg'

const NETWORK_ICON = {
  [chain.mainnet.id]: EthereumLogo,
  [chain.optimism.id]: OptimismLogo,
}

const SUPPORTED_CHAIN: Network[] = [
  { id: chain.mainnet.id, name: chain.mainnet.name, },
  { id: chain.optimism.id, name: chain.optimism.name, },
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

type NetworkButtonProps = {
  id: number
  name: string
  src: StaticImageData
  onClick: () => void
  isActive: boolean
}

export const NetworkSelector: FC<NetworkSelectorProps> = ({
  menuCls,
  dropdownCls,
  containerCls,
}) => {
  const [activeNetwork, setActiveNetwork] = useRecoilState(networkState)
  const { chain } = useNetwork()
  const { switchNetworkAsync, isSuccess } = useSwitchNetwork()
  const isWalletConnected = useRecoilValue(isWalletConnectedState)
  

  const onSwitchChain = async (chain: Network) => {
    const { id, name } = chain
    if (isWalletConnected && switchNetworkAsync) {
      try {
        await switchNetworkAsync(id)
        if (isSuccess) {
          setActiveNetwork({ id, name })
        }
      } catch (error) {
        console.error(error)
      }
    } else {
      setActiveNetwork({ id, name })
    }
  }

  useEffect(() => {
    if (chain?.unsupported) {
      return
    }
    if (chain) {
      setActiveNetwork({ id: chain.id, name: chain.name })
    }
  }, [chain, setActiveNetwork])

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
              name={chain.name}
              id={chain.id}
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
