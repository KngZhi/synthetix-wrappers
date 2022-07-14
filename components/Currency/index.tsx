import styled, { css } from 'styled-components'
import Image from 'next/image'

import { Button } from '../Button'
import { TokenInterface } from '../../constants/token'

type TokenProps = {
  token: TokenInterface
  imageSize: number
  fontSize?: number
  fontWeight?: number
  padding?: string
}

const Token = ({ token, imageSize }: TokenProps): JSX.Element => {
  return (
    <CurrencyContainer
      padding={'0'}
      fontSize={24}>
      <Image
        width={imageSize}
        height={imageSize}
        src={token.src}
        alt={token.name}
        priority={true}
      />
      <span>{token.name}</span>
    </CurrencyContainer>
  )
}

type CurrencyProps = {
  active?: boolean
  fontSize?: number
  fontWeight?: number
  padding?: string
}

const CurrencyContainer = styled.div<CurrencyProps>`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 8px;

  padding: ${({ padding }) => padding || '0px 10px'};
  max-width: 140px;
  height: 40px;

  ${({ active }) =>
    active &&
    css`
      background: rgba(130, 130, 149, 0.3);
      border-radius: 4px;
    `}

  span {
    font-style: normal;
    font-weight: ${(props) => props.fontWeight || 600};
    font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '14px')};
    line-height: 20px;
    color: #ffffff;
  }
`

const StyledCurrencyContainer = styled(CurrencyContainer)`
  justify-content: space-between;

  span {
    font-weight: 700;
    font-size: 24px;
    line-height: 29px;
  }
`

const CurrencySelectorButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0;
  max-width: 130px;
  height: 37px;

  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 8px;

  background: none;
`

export {
  CurrencyContainer,
  StyledCurrencyContainer,
  CurrencySelectorButton,
  Token,
}
