import { Modal, Button, Text, Container, Row, Col } from '@nextui-org/react'
import styled, { css } from 'styled-components'
import Image from 'next/image'

import ExplorerImage from '../../public/images/utils/explorer.svg'
import CopyImage from '../../public/images/utils/copy.svg'

import { MoreButton } from '../button'

type ProfileProps = {
  disconnect: () => void
  address: string
  changeAccount: () => void
  open: boolean
  onClose: () => void
  avatar
  changeWallet: () => void
}

const Profile: FC<ProfileProps> = ({
  address,
  open,
  onClose,
  disconnect,
  avatar,
  changeWallet,
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
          <Row>
            <Text color="white" size={18}>
              {address}
            </Text>
          </Row>
          <Row css={{ flexFlow: 'row nowrap' }}>
            <Image
              style={{ background: '#fff' }}
              src={CopyImage}
              alt="copy address"
            ></Image>
            <Text
              color="#828295"
              size={12}
              style={{ marginLeft: '6px', marginRight: '21.75px' }}
            >
              Copy Address
            </Text>
            <Image
              style={{ background: '#fff' }}
              color="#828295"
              src={ExplorerImage}
              alt="View on Explorer"
            ></Image>
            <Text color="#828295" size={12} css={{ marginLeft: '5.75px' }}>
              View On Explorer
            </Text>
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
            <BaseSlot>Ethereum</BaseSlot>
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
