import web3 from 'web3'
import { synthetix } from '@synthetixio/contracts-interface';
import { useContract, useProvider, useContractRead } from 'wagmi'
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


export function useEthWrapperL1Contract(signerOrProvider) {
    return useContract({
        addressOrName: ETH_WRAPPER_L1,
        contractInterface: EthWrapperL1,
        signerOrProvider: signerOrProvider,
    })
}

export function useLUSDWrapperL1Contract(signerOrProvider) {
    return useContract({
        addressOrName: LUSD_WRAPPER_L1,
        contractInterface: LUSDWrapperL2,
        signerOrProvider: signerOrProvider,
    })
}

export function useEthWrapperL1ContractRead(name: string, params?) {
    const { data, isError, isLoading } = useContractRead(
        { addressOrName: ETH_WRAPPER_L1, contractInterface: EthWrapperL1, },
        name,
        params,
    )

    return { data, isError, isLoading }
}

enum Read {
    MINT_FEE_RATE = 'mintFeeRate',
    BURN_FEE_RATE = 'burnFeeRate',
    MAX_ETH = 'maxETH',
    CAPACITY = 'capacity',
    GET_RESERVES = 'getReserves',
}

enum Write {
    BURN = 'burn',
    MINT = 'mint',
}

const bigNumberToEth = (val = 0) => web3.utils.fromWei(web3.utils.toBN(val))

export function useEthWrapperL1() {
    const { data: mintFeeRate } = useEthWrapperL1ContractRead(Read.MINT_FEE_RATE)
    const { data: capacity } = useEthWrapperL1ContractRead(Read.CAPACITY)
    const { data: maxETH } = useEthWrapperL1ContractRead(Read.MAX_ETH)
    const { data: reserves } = useEthWrapperL1ContractRead(Read.GET_RESERVES)

    return { 
        mintFeeRate: bigNumberToEth(mintFeeRate), 
        capacity: bigNumberToEth(capacity), 
        maxETH: bigNumberToEth(maxETH),
        reserves: bigNumberToEth(reserves),
    }
}
