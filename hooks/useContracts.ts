import { ContractInterface, Signer, providers, } from 'ethers'
import { useContractRead, useProvider } from 'wagmi'
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
import { formatUnits, Result } from 'ethers/lib/utils'
import { isL1State } from '../store/index'
import { useRecoilValue } from 'recoil'

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
    burnFeeRate: string
    mintFeeRate: string
    capacity: string
    maxTokenAmount: string
    calculateBurnFee?: () => Promise<string>
    calculateMintFee?: () => Promise<string>
    mint?: () => string
    burn?: () => string
}

enum Read {
    BURN_FEE_RATE = 'burnFeeRate',
    CALCULATE_BURN_FEE = 'calculateBurnFee',
    CALCULATE_MINT_FEE = 'calculateMintFee',
    CAPACITY = 'capacity',
    DECIMAL = 'decimal',
    GET_RESERVES = 'getReserves',
    MAX_ETH = 'maxETH',
    MAX_TOKEN_AMOUNT = 'maxTokenAmount',
    MINT_FEE_RATE = 'mintFeeRate',
}

enum Write {
    BURN = 'burn',
    MINT = 'mint',
}

export function useTokenContract(
    token: Token,
): BaseContractInterface {

    const [activeNetwork] = useRecoilState(networkState)
    // const provider = useProvider()
    const isL1 = useRecoilValue(isL1State)
    const contractSetup = getContractSetup(token, activeNetwork?.id)

    const useRead = (method: string) => useContractRead({
        ...contractSetup,
        functionName: method,
    })
    const { data: burnFeeRate } = useRead(Read.BURN_FEE_RATE)
    const { data: capacity } = useRead(Read.CAPACITY)
    const { data: mintFeeRate } = useRead(Read.MINT_FEE_RATE)
    const maxToken = (isL1 && token.key === 'eth')
        ? Read.MAX_ETH
        : Read.MAX_TOKEN_AMOUNT
    console.log(maxToken, token.key)
    const format = (data: Result | undefined) => data ? formatUnits(data, token.decimals) : '0'
    const { data: maxTokenAmount } = useRead(maxToken)

    return {
        burnFeeRate: format(burnFeeRate),
        capacity: format(capacity),
        mintFeeRate: format(mintFeeRate),
        maxTokenAmount: format(maxTokenAmount),
    }
}