import { ExternalLink as LinkIcon } from 'react-feather'
import ReactGA from 'react-ga4'
import styled from 'styled-components'
import { FC, HTMLProps } from 'react'

import { SupportedChainId } from '../constants/token'
import { anonymizeLink } from '../utils/anonymizeLink'

function handleClickExternalLink(event: React.MouseEvent<HTMLAnchorElement>) {
  const { target, href } = event.currentTarget

  const anonymizedHref = anonymizeLink(href)

  // don't prevent default, don't redirect if it's a new tab
  if (target === '_blank' || event.ctrlKey || event.metaKey) {
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      console.debug('Fired outbound link event', anonymizedHref)
    })
  } else {
    event.preventDefault()
    // send a ReactGA event and then trigger a location change
    ReactGA.outboundLink({ label: anonymizedHref }, () => {
      window.location.href = anonymizedHref
    })
  }
}

const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`

export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}: Omit<HTMLProps<HTMLAnchorElement>, 'as' | 'ref' | 'onClick'> & { href: string }) {
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest} />
}

const AddressLink = styled(ExternalLink)<{ hasENS: boolean; isENS: boolean }>`
  font-size: 0.825rem;
  color: ${({ theme }) => theme.text3};
  margin-left: 1rem;
  font-size: 0.825rem;
  display: flex;
  align-items: center;
  :hover {
    color: ${({ theme }) => theme.text2};
  }
`

type ExplorerProps = {
    account: any
    chainId: number
    ENSName: string
}

const ETHERSCAN_PREFIXES: { [chainId: number]: string } = {
  [SupportedChainId.MAINNET]: 'https://etherscan.io',
  [SupportedChainId.KOVAN]: 'https://kovan.etherscan.io',
  [SupportedChainId.OPTIMISM]: 'https://optimistic.etherscan.io',
  [SupportedChainId.OPTIMISTIC_KOVAN]: 'https://kovan-optimistic.etherscan.io',
}

function getExplorerLink(chainId: number, data: string): string{
      const prefix = ETHERSCAN_PREFIXES[chainId] ?? 'https://etherscan.io'
      return `${prefix}/address/${data}`
}

export const Explorer: FC<ExplorerProps> = ({
    account,
    chainId,
    ENSName,
}) => {
    return (<AddressLink
        hasENS={!!ENSName}
        isENS={true}
        href={getExplorerLink(chainId, ENSName)}
        >
        <LinkIcon size={16} />
        <span style={{ marginLeft: '4px' }}>
            View on Explorer
        </span>
        </AddressLink>
    )
}
