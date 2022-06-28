import styled from 'styled-components'
import Link from 'next/link'
const TooltipStyled = styled.div`
  margin-top: 12px;
  height: 88px;
  display: flex;
  justify-center: center;
  align-items: center;
  flex-direction: column;
  gap: 10px;
  a {
    color: #00d1ff;
  }
`

export default function TooltipContent() {
  return (
    <TooltipStyled>
      <p>The fee rate is decided by the Grants Council</p>
      <Link href="/">Learn More</Link>
    </TooltipStyled>
  )
}
