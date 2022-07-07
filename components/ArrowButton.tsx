import styled from 'styled-components'
import { ArrowDown } from 'react-feather'
const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;

  background: #000000;
  border: 1px solid #000000;
  border-radius: 50%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.9);
`
export default function ArrowButton() {
  return (
    <ArrowContainer>
      <ArrowDown color='#6F6E95' size={16} />
    </ArrowContainer>
  )
}
