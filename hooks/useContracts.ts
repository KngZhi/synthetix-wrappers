import Web3 from 'web3'
import { ContractInterface, Signer, providers, utils } from "ethers";
import { useContract, useContractRead, useContractWrite, useProvider } from 'wagmi'
import { SupportedChainId, Token } from '../constants/token'
import { useRecoilState } from 'recoil'
import { networkState } from '../store/index'
import {
    ETH_WRAPPER_L1,
    ETH_WRAPPER_L2,
    LUSD_WRAPPER_L1,
    LUSD_WRAPPER_L2,
    EthUsdContract
} from '../constants/contracts'


import EthWrapperL1ABI from '../abis/eth-wrapper-l1.json'
import EthWrapperL2ABI from '../abis/eth-wrapper-l2.json'
import LUSDWrapperL1ABI from '../abis/lusd-wrapper-l1.json'
import LUSDWrapperL2ABI from '../abis/lusd-wrapper-l2.json'
const aggregatorV3InterfaceABI = [{ "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }, { "internalType": "address", "name": "_accessController", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "int256", "name": "current", "type": "int256" }, { "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256" }], "name": "AnswerUpdated", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "startedBy", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256" }], "name": "NewRound", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferRequested", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "inputs": [], "name": "acceptOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "accessController", "outputs": [{ "internalType": "contract AccessControllerInterface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "aggregator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "confirmAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "description", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "getRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "_roundId", "type": "uint256" }], "name": "getTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestAnswer", "outputs": [{ "internalType": "int256", "name": "", "type": "int256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRound", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "latestTimestamp", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address payable", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "name": "phaseAggregators", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "phaseId", "outputs": [{ "internalType": "uint16", "name": "", "type": "uint16" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_aggregator", "type": "address" }], "name": "proposeAggregator", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "proposedAggregator", "outputs": [{ "internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint80", "name": "_roundId", "type": "uint80" }], "name": "proposedGetRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "proposedLatestRoundData", "outputs": [{ "internalType": "uint80", "name": "roundId", "type": "uint80" }, { "internalType": "int256", "name": "answer", "type": "int256" }, { "internalType": "uint256", "name": "startedAt", "type": "uint256" }, { "internalType": "uint256", "name": "updatedAt", "type": "uint256" }, { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_accessController", "type": "address" }], "name": "setController", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "version", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }]
const addr = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"



const bigNumberToEth = (val = 0) => Web3.utils.fromWei(Web3.utils.toBN(val), 'ether')

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
            break;
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
        signerOrProvider: provider,
    })
    const useRead = (field: string) => useContractRead(contractSetup, field)
    const { data: burnFeeRate } = useRead(Read.BURN_FEE_RATE)
    const { data: capacity } = useRead(Read.CAPACITY)
    const { data: mintFeeRate } = useRead(Read.MINT_FEE_RATE)
    const maxToken = token.name === 'eth' ? Read.MAX_ETH : Read.MAX_TOKEN_AMOUNT
    const { data: maxTokenAmount } = useRead(maxToken)

    const gas = {
        gasPrice: Web3.utils.toWei('2', 'Gwei'),
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

export function useEthPrice() {
    const { data, isLoading } = useContractRead(EthUsdContract, 'latestAnswer')

    if (!isLoading) {
        console.log('contract', utils.formatUnits(data, 8));
    }
    return data
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
