import styled, { css } from 'styled-components'
import Image from 'next/image'

import { TokenInterface } from '../../constants/token'

type TokenProps = {
  token: TokenInterface
  imageSize?: number
  onClick?(): void
  children?: JSX.Element
}

type TokenStyleProps = {
  active?: boolean
  fontSize?: number
  fontWeight?: number
  padding?: string
}

const Token = ({
  token,
  imageSize = 24,
  onClick,
  children,
  fontSize,
  fontWeight,
  padding,
  active = false,
}: TokenProps & TokenStyleProps): JSX.Element => {
  return (
    <TokenContainer
      onClick={onClick}
      active={active}
      padding={padding}
      fontWeight={fontWeight}
      fontSize={fontSize}
    >
      <Image
        width={imageSize}
        height={imageSize}
        src={token.src}
        alt={token.name}
        priority={true}
      />
      <span>{token.name}</span>
      {children}
    </TokenContainer>
  )
}


const TokenContainer = styled.div<TokenStyleProps>`
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
    font-weight: ${(props) => props.fontWeight || 700};
    font-size: ${({ fontSize }) => (fontSize ? `${fontSize}px` : '24px')};
    color: #ffffff;
  }
`

const TokenSelector = styled.div`
  max-width: 150px;
  cursor: pointer;
  border: 1px solid rgba(130, 130, 149, 0.3);
  border-radius: 8px;
`

export {
  TokenSelector,
  Token,
}
