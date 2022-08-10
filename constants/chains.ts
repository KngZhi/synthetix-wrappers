import { getChainIdHex, getInfuraRpcURL } from '../utils/infura'
import { NetworkIdByName } from '@synthetixio/contracts-interface'

type Token = 'ETH'

interface Chain {
    id: string;
    token: Token;
    label: string;
    rpcUrl: string;
}

export const SupportedChains: Chain[] = [
	// Mainnet
	{
		id: getChainIdHex(NetworkIdByName.mainnet),
		token: 'ETH',
		label: 'Ethereum Mainnet',
		rpcUrl: getInfuraRpcURL(NetworkIdByName.mainnet),
	},
	// Mainnet Ovm
	{
		id: getChainIdHex(NetworkIdByName['mainnet-ovm']),
		token: 'ETH',
		label: 'Optimism Mainnet',
		rpcUrl: getInfuraRpcURL(NetworkIdByName['mainnet-ovm']),
	},
	// Kovan
	{
		id: getChainIdHex(NetworkIdByName.kovan),
		token: 'ETH',
		label: 'Kovan',
		rpcUrl: getInfuraRpcURL(NetworkIdByName.kovan),
	},
	// Kovan Ovm
	{
		id: getChainIdHex(NetworkIdByName['kovan-ovm']),
		token: 'ETH',
		label: 'Optimism Kovan',
		rpcUrl: getInfuraRpcURL(NetworkIdByName['kovan-ovm']),
	},
]