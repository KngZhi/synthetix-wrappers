import Link from 'next/link'

import { FC } from 'react'
import styled from 'styled-components'

import { Button } from './Button'

const Footer: FC = () => {
  return (
    <Container>
      <Link href="/faq">
        <SquareButton
          size="sm"
          onClick={() =>
            console.log('You clicked on the question mark button!')
          }
        >
          <span>?</span>
        </SquareButton>
      </Link>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
  padding: 40px;
`

const SquareButton = styled(Button)`
  span {
    font-size: 20px;
  }
`

export default Footer
