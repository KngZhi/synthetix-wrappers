import { StaticImageData } from 'next/image'
import ETHLogo from '../public/images/logos/ethereum.svg'
import LUSDLogo from '../public/images/synths/sLUSD.png'
import sUSDLogo from '../public/images/synths/sUSD.png'
import sETHLogo from '../public/images/synths/sETH.png'

export type CurrencyKey = string;
export type TokenAddress = string;

export const sETH_ADDRESS = '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb'
export const LUSD_ADDRESS = '0x5f98805a4e8be255a32880fdec7f6728c6568ba0'
export const sUSD_ADDRESS = '0x57ab1ec28d129707052df4df418d58a2d46d5f51'

export enum SupportedChainId {
	MAINNET = 1,
	KOVAN = 42,

	OPTIMISM = 10,
	OPTIMISTIC_KOVAN = 69,
}


export enum Tokens {
	sETH = 'sETH',
	LUSD = 'LUSD',
	ETH = 'ETH',
	sUSD = 'sUSD',
}

export type TokenKey = 'seth' | 'lusd' | 'eth' | 'susd'

export interface TokenInterface {
	name: string;
	key: string;
	address: TokenAddress;
	src: StaticImageData;
	decimals: number;
	precision: number;
}

export const LUSD: TokenInterface = {
	name: 'LUSD',
	key: 'lusd',
	address: LUSD_ADDRESS,
	src: LUSDLogo,
	decimals: 18,
	precision: 2,
}

export const sETH: TokenInterface = {
	name: 'sETH',
	key: 'seth',
	address: sETH_ADDRESS,
	src: sETHLogo,
	decimals: 18,
	precision: 4,
}

export const ETH: TokenInterface = {
	name: 'ETH',
	key: 'eth',
	address: '',
	src: ETHLogo,
	decimals: 18,
	precision: 4,
}

export const sUSD: TokenInterface = {
	name: 'sUSD',
	key: 'susd',
	address: sUSD_ADDRESS,
	src: sUSDLogo,
	decimals: 18,
	precision: 2,
}

export type PairToken = [TokenInterface, TokenInterface]

export const L1_Wrap: PairToken[] = [
	[LUSD, sUSD],
]

export const L1_Unwrap: PairToken[] = [
	[sETH, ETH],
	[sUSD, LUSD],
]

export const L2_WRAP: PairToken[] = [
	[ETH, sETH]
]

export const L2_Unwrap: PairToken[] = [
	[sETH, ETH],
]