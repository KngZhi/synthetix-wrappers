import { synthetix } from '@synthetixio/contracts-interface';
import { useContract, useProvider } from 'wagmi'
import { SupportedChainId } from '../constants/token'
import {
    ETH_WRAPPER_L1,
    ETH_WRAPPER_L2,
    LUSD_WRAPPER_L1,
    LUSD_WRAPPER_L2
} from '../constants/contracts'


import EthWrapperL1 from '../abis/eth-wrapper-l1.json'
import EthWrapperL2 from '../abis/eth-wrapper-l2.json'
import LUSDWrapperL1 from '../abis/lusd-wrapper-l1.json'
import LUSDWrapperL2 from '../abis/lusd-wrapper-l2.json'

export function useEthWrapperL1Contract() {
    const provider = useProvider()
    return useContract({
        addressOrName: ETH_WRAPPER_L1,
        contractInterface: EthWrapperL1,
        signerOrProvider: provider,
    })
}
