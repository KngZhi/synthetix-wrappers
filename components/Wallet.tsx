import { useEffect } from 'react'
import styled from 'styled-components'
import { useConnect, useAccount, useDisconnect } from 'wagmi'
import { Modal, Text } from '@nextui-org/react'
import { useBoolean } from 'usehooks-ts'

import {
  Button as BaseButton,
  WalletSelectorButton,
  MoreButton,
  AddrButton,
} from './Button'

import {
  isWalletConnectedState,
  walletAddressState,
  networkState,
} from '../store/index'

import styles from './Modal/Modal.module.css'
import Image, { StaticImageData } from 'next/image'
import MetaMask from '../public/images/wallets/metamask.svg'
import WalletConnect from '../public/images/wallets/WalletConnect.svg'

import { truncateAddress } from '../utils/string'
import Profile from './Modal/Profile'
import { useRecoilValue, useRecoilState } from 'recoil'

const picTable: Record<string, StaticImageData> = {
  MetaMask: MetaMask,
  WalletConnect: WalletConnect,
}

export default function WalletButton() {
  const {
    value: visible,
    setFalse: hideWallet,
    setTrue: showWallet,
  } = useBoolean(false)
  const {
    value: profileVisible,
    setFalse: hideProfile,
    setTrue: showProfile,
  } = useBoolean(false)
  const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState)
  const isWalletConnected = useRecoilValue(isWalletConnectedState)
  const [activeNetwork] = useRecoilState(networkState)

  const { connect, connectors } = useConnect()
  const { address } = useAccount()

  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (address) {
      setWalletAddress(address)
    }
  }, [address, setWalletAddress])

  const addr = truncateAddress(walletAddress || '')
  function handleChangeWallet() {
    showWallet()
    hideProfile()
  }

  function handleDisconnect() {
    disconnect()
    setWalletAddress(undefined)
    hideProfile()
  }

  return (
    <>
      {isWalletConnected ? (
        <AddrButton onClick={showProfile}>
          <span className="dot"></span>
          {addr}
        </AddrButton>
      ) : (
        <ConnectWalletButton onClick={showWallet}>
          <span>Connect Wallet</span>
        </ConnectWalletButton>
      )}
      <>
        <Profile
          open={profileVisible}
          address={walletAddress || ''}
          shortAddr={addr}
          chainId={activeNetwork?.id}
          disconnect={handleDisconnect}
          onClose={hideProfile}
          changeWallet={handleChangeWallet}
        />
        <Modal
          css={{
            background:
              'linear-gradient(121.5deg, #101215 55.37%, #22272B 106.67%);',
            color: '#fff',
            boxShadow: '0px 14px 14px rgba(0, 0, 0, 0.25)',
          }}
          className={styles.wallet_modal}
          width="370px"
          closeButton
          open={visible}
          onClose={hideWallet}
        >
          <Modal.Header
            css={{ flexDirection: 'column', alignContent: 'center' }}
          >
            <div>
              <Text b id="modal-title" color="#fff" size={18}>
                Connect To Wallet
              </Text>
            </div>
            <div>
              <Text color="#828295">
                Please select a wallet to connect to this dapp
              </Text>
            </div>
          </Modal.Header>
          <Modal.Body>
            {connectors.map((connector) => (
              <WalletSelectorButton
                key={connector.id}
                onClick={() => {
                  connect({ connector })
                  hideWallet()
                }}
              >
                <Image src={picTable[connector.name]} alt={connector.name} />
                <span>
                  {connector.name}
                  {!connector.ready && ' (unsupported)'}
                </span>
              </WalletSelectorButton>
            ))}
          </Modal.Body>
          <Modal.Footer
            css={{
              justifyContent: 'center',
              paddingTop: '$0',
              paddingBottom: '13px',
            }}
          >
            <MoreButton>
              <span> See More</span>
            </MoreButton>
          </Modal.Footer>
        </Modal>
      </>
    </>
  )
}

const ConnectWalletButton = styled(BaseButton)`
  /* Remove break lines */
  white-space: nowrap;

  /* Border */
  border: 2px solid transparent;
  background: linear-gradient(#000000 0 0) padding-box,
    linear-gradient(73.6deg, #85ffc4 2.11%, #5cc6ff 90.45%) border-box;

  /* Text */
  span {
    font-weight: 700;

    /* Gradient */
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
