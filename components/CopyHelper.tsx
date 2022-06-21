import useCopyClipboard from '../hooks/useCopyClipboard'
import React, { useCallback } from 'react'
import { CheckCircle, Copy } from 'react-feather'
import styled from 'styled-components'

export const LinkStyledButton = styled.button<{ disabled?: boolean }>`
  border: none;
  text-decoration: none;
  background: none;

  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  color: ${({ theme, disabled }) => (disabled ? theme.text2 : theme.primary1)};
  font-size: 12px;

  :hover {
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :focus {
    outline: none;
    text-decoration: ${({ disabled }) => (disabled ? null : 'underline')};
  }

  :active {
    text-decoration: none;
  }
`
const CopyIcon = styled(LinkStyledButton)`
  align-items: center;
  color: ${({ color, theme }) => color || theme.text3};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ color, theme }) => color || theme.text2};
  }
`
const StyledText = styled.span`
  display: flex;
  margin-left: 0.25rem;
  align-items: center;
`

const Copied = ({ iconSize }: { iconSize?: number }) => (
  <StyledText>
    <CheckCircle size={iconSize ?? '16'} />
    <StyledText> Copied </StyledText>
  </StyledText>
)

const Icon = ({ iconSize }: { iconSize?: number }) => (
  <StyledText>
    <Copy size={iconSize ?? '16'} />
    <StyledText> Copy Address </StyledText>
  </StyledText>
)

interface BaseProps {
  toCopy: string
  color?: string
  iconSize?: number
}
export type CopyHelperProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>

export default function CopyHelper({
  color,
  toCopy,
  children,
  iconSize,
}: CopyHelperProps) {
  const [isCopied, setCopied] = useCopyClipboard()
  const copy = useCallback(() => {
    setCopied(toCopy)
  }, [toCopy, setCopied])

  return (
    <CopyIcon onClick={copy} color={color}>
      {isCopied ? <Copied iconSize={iconSize} /> : <Icon iconSize={iconSize} />}{' '}
      {isCopied ? '' : children}
    </CopyIcon>
  )
}
