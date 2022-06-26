import styled from 'styled-components'

const BaseModal = styled.div`
  border: 2px solid #000000;
  box-shadow: 0px 14px 14px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
`

const WalletModal = styled(BaseModal)`
  background: linear-gradient(121.5deg, #101215 55.37%, #22272b 106.67%);
`

export { BaseModal, WalletModal }
