import { NetworkId, NetworkName } from '@synthetixio/contracts-interface'
import { SupportedChains } from 'constants/chains'

export type Network = {
	id: NetworkId;
	name: NetworkName;
	useOvm: boolean;
};
export function isSupportedNetworkId(id: number | string): id is NetworkId {
	return SupportedChains.map(chain => Number(chain.id)).includes(Number(id))
}
export const getIsOVM = (networkId: number): boolean => !!~[10, 69].indexOf(networkId)
