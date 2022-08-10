import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import walletConnectModule from '@web3-onboard/walletconnect'
import ledgerModule from '@web3-onboard/ledger'
import trezorModule from '@web3-onboard/trezor'
import gnosisModule from '@web3-onboard/gnosis'
import portisModule from '@web3-onboard/portis'
import torusModule from '@web3-onboard/torus'
import { SupportedChains } from '../constants/chains'
import { SynthetixIcon, SynthetixLogo } from '../components/WalletComponents'


const injected = injectedModule()
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })
const walletConnect = walletConnectModule()
const ledger = ledgerModule()
const trezor = trezorModule({ email: 'info@synthetix.io', appUrl: 'https://www.synthetix.io' })
const gnosis = gnosisModule()
const portis = portisModule({ apiKey: `${process.env.NEXT_PUBLIC_PORTIS_APP_ID}` })
const torus = torusModule()

export const onboard = init({
	appMetadata: {
		name: 'Synthetix',
		icon: SynthetixIcon,
		logo: SynthetixLogo,
		description: 'Synthetix | The derivatives liquidity protocol.',
		recommendedInjectedWallets: [
			{ name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
			{ name: 'MetaMask', url: 'https://metamask.io' },
		],
		gettingStartedGuide: 'https://synthetix.io',
		explore: 'https://blog.synthetix.io/',
	},
	apiKey: process.env.NEXT_PUBLIC_BN_ONBOARD_API_KEY,
	wallets: [injected, ledger, trezor, coinbaseWalletSdk, walletConnect, gnosis, portis, torus],
	chains: [...SupportedChains],
	accountCenter: {
		desktop: {
			enabled: false,
			containerElement: 'body',
		},
		mobile: {
			enabled: false,
			containerElement: 'body',
		},
	},
	notify: {
		enabled: false,
	},
})
