import web3 from 'web3'
import { ContractInterface, Signer, providers } from "ethers";
import { useContract, useContractRead, useContractWrite } from 'wagmi'
import { SupportedChainId, Token } from '../constants/token'
import { useRecoilState } from 'recoil'
import { networkState } from '../store/index'
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

const bigNumberToEth = (val = 0) => web3.utils.fromWei(web3.utils.toBN(val), 'ether')

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
                    contractInterface: EthWrapperL1,
                }
            } else {
                contractSetup = {
                    addressOrName: LUSD_WRAPPER_L1,
                    contractInterface: LUSDWrapperL1,
                }
            }
            break;
        case SupportedChainId.OPTIMISM:
        case SupportedChainId.OPTIMISTIC_KOVAN:
            if (['eth', 'seth'].includes(token.key)) {
                contractSetup = {
                    addressOrName: ETH_WRAPPER_L2,
                    contractInterface: EthWrapperL2,
                }
            } else {
                contractSetup = {
                    addressOrName: LUSD_WRAPPER_L2,
                    contractInterface: LUSDWrapperL2,
                }
            }
            break
        default:
            console.log(
                '[ERR]: can not find ideal contract for current token',
                token,
                chainId,
            )
            break;
    }
    return contractSetup
}

interface BaseContractInterface {
    burnFeeRate: string
    mintFeeRate: string
    capacity: string
    maxTokenAmount: string
    calculateBurnFee: () => Promise<string>
    calculateMintFee: () => Promise<string>
    mint: () => string
    burn: () => string
}

export function useTokenContract(
    token: Token,
    signer: Signer,
    provider: providers.Provider
): BaseContractInterface {
    
    const [activeNetwork] = useRecoilState(networkState)
    const contractSetup = getContractSetup(token, activeNetwork?.id)
    const readContract = useContract({
        ...contractSetup,
        signerOrProvider: provider,
    })
    const writeContract = useContract({
        ...contractSetup,
        signerOrProvider: signer,
    })
    const useRead = (field: string) => useContractRead(contractSetup, field)
    const { data: burnFeeRate } = useRead(Read.BURN_FEE_RATE)
    const { data: capacity } = useRead(Read.CAPACITY)
    const { data: mintFeeRate } = useRead(Read.MINT_FEE_RATE)
    const maxToken = token.name === 'eth' ? Read.MAX_ETH : Read.MAX_TOKEN_AMOUNT
    const { data: maxTokenAmount } = useRead(maxToken)

    const gas = {
        gasPrice: web3.utils.toWei('2', 'Gwei'),
        gasLimit: 500e3,
    }

    return {
        burnFeeRate,
        capacity,
        mintFeeRate,
        maxTokenAmount,
        calculateBurnFee: (val) => readContract[Read.CALCULATE_BURN_FEE](val, gas),
        calculateMintFee(val) {
           return readContract[Read.CALCULATE_MINT_FEE](val, gas)
        },
        mint: async (val) => await writeContract[Write.MINT](val, gas),
        burn: (val) => writeContract[Write.BURN](val, gas),
    }
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

enum Write {
    BURN = 'burn',
    MINT = 'mint',
}
