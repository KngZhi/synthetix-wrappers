import { FC, } from 'react'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import { Modal, Text, Container, Row, Col } from '@nextui-org/react'
import styled from 'styled-components'
import CopyHelper from '../CopyHelper'
import { Explorer } from '../Explorer'

import { MoreButton } from '../button'
import { NetworkSelector } from '../NetworkSelector'

type ProfileProps = {
  disconnect: () => void
  address: string
  shortAddr: string
  changeAccount: () => void
  open: boolean
  onClose: () => void
  avatar
  changeWallet: () => void
  chainId: number
}

const Profile: FC<ProfileProps> = ({
  address = '',
  shortAddr,
  open = false,
  onClose = () => {},
  disconnect = () => {},
  avatar,
  changeWallet = () => {},
  chainId,
}) => {
  function handleDisconnect() {
    disconnect()
    onClose()
  }
  return (
    <Modal
      width="370px"
      css={{
        padding: '53px 28px 43px',
        background:
          'linear-gradient(121.5deg, #101215 55.37%, #22272B 106.67%);',
        color: '#fff',
        boxShadow: '0px 14px 14px rgba(0, 0, 0, 0.25)',
        cursor: 'default',
        overflow: 'unset',
      }}
      open={open}
      onClose={onClose}
      closeButton
    >
      <div style={{ fontSize: '18px', marginBottom: '34px' }}>
        <Text b size={18} color="#fff">
          My Account
        </Text>
      </div>
      <BaseSlot>
        <Container
          css={{
            padding: '12px 13px',
            position: 'relative',
          }}
        >
          <Row>
            <Text color="#828295" size={14}>
              Connected with MetaMast
            </Text>
          </Row>
            <Row css={{ gap: '4px', alignItems: 'center', marginBottom: '2px' }}>
            <Jazzicon diameter={18} seed={jsNumberForAddress(address || '')} />
            <Text color="white" size={18}>
              {shortAddr}
            </Text>
          </Row>
          <Row css={{ alignItem: 'center'}}>
            <CopyHelper
              iconSize={16}
              toCopy={address}
              color="#828295"
            ></CopyHelper>
            <Explorer chainId={chainId} account={address} ENSName={address} />
          </Row>
          <ChangeButton onClick={changeWallet}>
            <span>Change</span>
          </ChangeButton>
        </Container>
      </BaseSlot>
      <Container gap={0} css={{ marginTop: '8px' }}>
        <Row css={{ gap: '7px' }}>
          <Col css={{ width: '110px' }}>
            <DisconnectButton onClick={handleDisconnect}>
              Disconnect
            </DisconnectButton>
          </Col>
          <Col>
            <NetworkSlot>
              <NetworkSelector
                menuCls="menu-selector"
                dropdownCls="drop-container"
              />
            </NetworkSlot>
          </Col>
        </Row>
      </Container>
      <div></div>
    </Modal>
  )
}

export default Profile

const BaseSlot = styled.div`
  background: #000000;
  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 5px;
  color: #828295;
`

const NetworkSlot = styled(BaseSlot)`
  .menu-selector {
    width: 100%;
    button {
      background: #000;
      border: unset;
      width: 100%;
      box-shadow: unset;
    }
  }
  .drop-container div {
    background: #000;
    width: 195px;
  }
`

const ChangeButton = styled(MoreButton)`
  font-size: 12px;
  position: absolute;
  width: 66px;
  line-height: 28px;
  padding: unset;
  top: 9px;
  right: 9px;
  font-weight: 700;
  border-radius: 5px;
`

const DisconnectButton = styled(BaseSlot)`
  color: #00d1ff;
  line-height: 44px;
  font-weight: 700;
  width: 110px;
`
