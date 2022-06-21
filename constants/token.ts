import { ReactElement } from "react";

export type CurrencyKey = string;
export type TokenAddress = string;

export const sETH_ADDRESS = '0x5e74c9036fb86bd7ecdcb084a0673efc32ea31cb';
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
	EHT = 'ETH',
	sUSD = 'sUSD',
}

export interface Token {
  name: string;
  key: string;
  address: TokenAddress;
  src?: ReactElement;
}

export const LUSD = {
	name: 'LUSD',
	key: 'lusd',
	address: LUSD_ADDRESS,
}

export const sETH = {
	name: 'sETH',
	key: 'seth',
	address: sETH_ADDRESS,
}

export const ETH = {
	name: 'ETH',
	key: 'eth',
	address: '',
}

export const sUSD = {
	name: 'sUSD',
	key: 'susd',
	address: sUSD_ADDRESS,
}

export type PairToken = [Token, Token]

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
