import { ContractInterface } from 'ethers'
import EthWrapperABI from '../abis/eth-wrapper-l1.json'
import EthWrapperKovanABI from '../abis/eth-wrapper-kovan.json'
import AGGREGATOR_L2_ABI from '../abis/aggregatorV3Interface-l2.json'


export const ETH_WRAPPER_L1 = '0xCea392596F1AB7f1d6f8F241967094cA519E6129'
export const ETH_WRAPPER_L2 = '0x6202a3b0be1d222971e93aab084c6e584c29db70'
export const LUSD_WRAPPER_L1 = '0x7c22547779c8aa41bae79e03e8383a0befbcecf0'
export const LUSD_WRAPPER_L2 = '0x8a91e92fdd86e734781c38db52a390e1b99fba7c'

const EthWrapperKovanAddr = '0x44Af736495544a726ED15CB0EBe2d87a6bCC1832'

type ContractSetup = {
    addressOrName: string;
    contractInterface: ContractInterface;
}

export const AGGREGATOR_L2_CONTRACT: ContractSetup = {
    addressOrName: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    contractInterface: AGGREGATOR_L2_ABI,
}

export const ETH_WRAPPER_L1_CONTRACT: ContractSetup = {
    addressOrName: ETH_WRAPPER_L1,
    contractInterface: EthWrapperABI,
}

export const EthWrapperL1KovanContract: ContractSetup = {
    addressOrName: EthWrapperKovanAddr,
    contractInterface: EthWrapperKovanABI,
}