import { getChainIdHex, getInfuraRpcURL } from '../utils/infura'
import { NetworkIdByName } from '@synthetixio/contracts-interface'

type Token = 'ETH'

export interface Chain {
	id: string;
	token: Token;
	label: string;
	rpcUrl: string;
}

export const Ethereum: Chain = {
	id: getChainIdHex(NetworkIdByName.mainnet),
	token: 'ETH',
	label: 'Ethereum',
	rpcUrl: getInfuraRpcURL(NetworkIdByName.mainnet),
}

export const Optimism: Chain = {
	id: getChainIdHex(NetworkIdByName['mainnet-ovm']),
	token: 'ETH',
	label: 'Optimism',
	rpcUrl: getInfuraRpcURL(NetworkIdByName['mainnet-ovm']),
}

export const SupportedChains: Chain[] = [
	Ethereum,
	Optimism,
	// Kovan
	// {
	// 	id: getChainIdHex(NetworkIdByName.kovan),
	// 	token: 'ETH',
	// 	label: 'Kovan',
	// 	rpcUrl: getInfuraRpcURL(NetworkIdByName.kovan),
	// },
	// // Kovan Ovm
	// {
	// 	id: getChainIdHex(NetworkIdByName['kovan-ovm']),
	// 	token: 'ETH',
	// 	label: 'Optimism Kovan',
	// 	rpcUrl: getInfuraRpcURL(NetworkIdByName['kovan-ovm']),
	// },
]