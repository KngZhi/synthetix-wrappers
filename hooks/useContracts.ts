import { ContractInterface, Signer, providers, } from 'ethers'
import { useContractRead } from 'wagmi'
import { SupportedChainId, Token } from '../constants/token'
import { useRecoilState } from 'recoil'
import { networkState } from '../store/index'
import {
    ETH_WRAPPER_L1,
    ETH_WRAPPER_L2,
    LUSD_WRAPPER_L1,
    LUSD_WRAPPER_L2,
    ETH_WRAPPER_L1_CONTRACT,
} from '../constants/contracts'
import EthWrapperL1ABI from '../abis/eth-wrapper-l1.json'
import EthWrapperL2ABI from '../abis/eth-wrapper-l2.json'
import LUSDWrapperL1ABI from '../abis/lusd-wrapper-l1.json'
import LUSDWrapperL2ABI from '../abis/lusd-wrapper-l2.json'
import { Result } from 'ethers/lib/utils'

type ContractSetup = {
    addressOrName: string;
    contractInterface: ContractInterface;
}

function getContractSetup(token: Token, chainId: number): ContractSetup {
    let contractSetup: ContractSetup
    switch (chainId) {
        case SupportedChainId.KOVAN:
        case SupportedChainId.MAINNET:
            if (['eth', 'seth'].includes(token.key)) {
                contractSetup = {
                    addressOrName: ETH_WRAPPER_L1,
                    contractInterface: EthWrapperL1ABI,
                }
            } else {
                contractSetup = {
                    addressOrName: LUSD_WRAPPER_L1,
                    contractInterface: LUSDWrapperL1ABI,
                }
            }
            break
        case SupportedChainId.OPTIMISM:
        case SupportedChainId.OPTIMISTIC_KOVAN:
            if (['eth', 'seth'].includes(token.key)) {
                contractSetup = {
                    addressOrName: ETH_WRAPPER_L2,
                    contractInterface: EthWrapperL2ABI,
                }
            } else {
                contractSetup = {
                    addressOrName: LUSD_WRAPPER_L2,
                    contractInterface: LUSDWrapperL2ABI,
                }
            }
            break
        default:
            console.log(
                '[ERR]: can not find ideal contract for current token',
                token,
                chainId,
            )
            contractSetup = ETH_WRAPPER_L1_CONTRACT
            break
    }
    return contractSetup
}

interface BaseContractInterface {
    burnFeeRate: Result | undefined
    mintFeeRate: Result | undefined
    capacity: Result | undefined
    maxTokenAmount: Result | undefined
    calculateBurnFee?: () => Promise<string>
    calculateMintFee?: () => Promise<string>
    mint?: () => string
    burn?: () => string
}

enum Read {
    CALCULATE_BURN_FEE = 'calculateBurnFee',
    CALCULATE_MINT_FEE = 'calculateMintFee',
    MINT_FEE_RATE = 'mintFeeRate',
    BURN_FEE_RATE = 'burnFeeRate',
    MAX_ETH = 'maxETH',
    CAPACITY = 'capacity',
    GET_RESERVES = 'getReserves',
    MAX_TOKEN_AMOUNT = 'maxTokenAmount'
}

// enum Write {
//     BURN = 'burn',
//     MINT = 'mint',
// }

export function useTokenContract(
    token: Token,
    signer: Signer,
    provider: providers.Provider
): BaseContractInterface {

    const [activeNetwork] = useRecoilState(networkState)
    const contractSetup = getContractSetup(token, activeNetwork?.id)
    // const readContract = useContract({
    //     ...contractSetup,
    //     signerOrProvider: provider,
    // })

    // const writeContract = useContract({
    //     ...contractSetup,
    //     signerOrProvider: signer || provider,
    // })
    const useRead = (field: string) => useContractRead(contractSetup, field)
    const { data: burnFeeRate } = useRead(Read.BURN_FEE_RATE)
    const { data: capacity } = useRead(Read.CAPACITY)
    const { data: mintFeeRate } = useRead(Read.MINT_FEE_RATE)
    const maxToken = token.name === 'eth' ? Read.MAX_ETH : Read.MAX_TOKEN_AMOUNT
    const { data: maxTokenAmount } = useRead(maxToken)

    return {
        burnFeeRate,
        capacity,
        mintFeeRate,
        maxTokenAmount,
    }
}