import styled from 'styled-components'
import { useBoolean } from 'usehooks-ts'

import {
  Button as BaseButton,
  AddrButton,
} from './Button'

import {
  networkState,
} from '../store/index'

import { truncateAddress } from '../utils/string'
import Profile from './Modal/Profile'
import { useRecoilState } from 'recoil'
import { useConnectorContext } from 'connector/Connector'

type WalletButtonProps = {
  visible: boolean
  hideWallet: () => void
  showWallet: () => void
}

export default function WalletButton({
  visible,
  hideWallet,
  showWallet,
}: WalletButtonProps) {
  const { connectWallet, disconnectWallet, walletAddress }= useConnectorContext()

  const {
    value: profileVisible,
    setFalse: hideProfile,
    setTrue: showProfile,
  } = useBoolean(false)
  const [activeNetwork] = useRecoilState(networkState)

  const addr = truncateAddress(walletAddress || '')
  function handleChangeWallet() {
    hideProfile()
    connectWallet()
  }

  function handleDisconnect() {
    disconnectWallet()
    hideProfile()
  }

  return (
    <>
      {walletAddress ? (
        <AddrButton onClick={showProfile}>
          <span className="dot"></span>
          {addr}
        </AddrButton>
      ) : (
        <ConnectWalletButton onClick={connectWallet}>
          <span>Connect Wallet</span>
        </ConnectWalletButton>
      )}
      <>
        <Profile
          open={profileVisible}
          address={walletAddress || ''}
          shortAddr={addr}
          chainId={Number(activeNetwork?.id)}
          disconnect={handleDisconnect}
          onClose={hideProfile}
          changeWallet={handleChangeWallet}
        />
      </>
    </>
  )
}

const ConnectWalletButton = styled(BaseButton)`
  white-space: nowrap;

  border: 2px solid transparent;
  background: linear-gradient(#000000 0 0) padding-box,
    linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%) border-box;

  span {
    font-weight: 700;

    background-color: white;
    background-image: linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%);
    background-size: 100%;
    background-repeat: repeat;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    color: transparent;
  }

  &:hover {
    border-width: 3px;
    background: linear-gradient(#000000 0 0) padding-box,
      linear-gradient(-73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%) border-box;
  }

  &:active {
    border-width: 4px;
    box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.25);
  }
`
