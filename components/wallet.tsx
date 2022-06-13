import Web3 from 'web3'
import { ethers, providers } from 'ethers'
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useConnect, useAccount, useDisconnect, useEnsAvatar } from 'wagmi'
import { Modal, Button, Text, Row } from '@nextui-org/react'

import {
  Button as BaseButton,
  WalletSelectorButton,
  MoreButton,
  AddrButton,
} from './button'

import { isWalletConnectedState, walletAddressState } from '../store/index'

import styles from './Modal/Modal.module.css'
import Image from 'next/image'
import MetaMaskPic from '../public/images/wallets/metamask.svg'
import LedgerPic from '../public/images/wallets/ledger.svg'
import TrezorPic from '../public/images/wallets/trezor.svg'
import ConnectMobilePic from '../public/images/wallets/connect-mobile.svg'

import { truncateAddress } from '../utils/string'
import Profile from '../components/Modal/Profile'
import { useRecoilValue, useRecoilState } from 'recoil'

export default function WalletButton() {
  const [visible, setVisible] = useState<boolean>(false)
  const [walletAddress, setWalletAddress] = useRecoilState(walletAddressState)
  const isWalletConnected = useRecoilValue(isWalletConnectedState)
  const handler = () => setVisible(true)
  const closeHandle = () => setVisible(false)

  const [profileVisible, setProfileVisible] = useState<boolean>(false)

  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()
  const { data: account } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })

  const { disconnect } = useDisconnect()
  const imageTable = {
    metamast: MetaMaskPic,
    coinbaseWallet: LedgerPic,
    walletConnect: TrezorPic,
    injected: ConnectMobilePic,
  }

  useEffect(() => {
    if (account?.address) {
      setWalletAddress(account.address)
    }
  }, [account, setWalletAddress])

  const addr = truncateAddress(account?.address || '')
  function handleChangeWallet() {
    handler()
    setProfileVisible(false)
  }

  function handleDisconnect() {
    disconnect()
    setWalletAddress(null)
    setProfileVisible(false)
  }

  return (
    <>
      {isWalletConnected ? (
        <AddrButton onClick={() => setProfileVisible(true)}>
          <span className="dot"></span>
          {addr}
        </AddrButton>
      ) : (
        <ConnectWalletButton onClick={handler}>
          <span>Connect Wallet</span>
        </ConnectWalletButton>
      )}
      <>
        <Profile
          open={profileVisible}
          address={addr}
          avatar={ensAvatar}
          disconnect={handleDisconnect}
          onClose={() => setProfileVisible(false)}
          changeWallet={handleChangeWallet}
        ></Profile>
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
          onClose={closeHandle}
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
                disabled={!connector.ready}
                key={connector.id}
                onClick={() => {
                  connect(connector)
                  closeHandle()
                }}
              >
                <Image src={MetaMaskPic} alt={connector.name} />
                <span>
                  {connector.name}
                  {!connector.ready && ' (unsupported)'}
                  {isConnecting &&
                    connector.id === pendingConnector?.id &&
                    ' (connecting)'}
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
