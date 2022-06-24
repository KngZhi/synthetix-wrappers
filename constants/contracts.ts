export const ETH_WRAPPER_L1 = '0xC1AAE9d18bBe386B102435a8632C8063d31e747C';
export const ETH_WRAPPER_L2 = '0x6202a3b0be1d222971e93aab084c6e584c29db70';
export const LUSD_WRAPPER_L1 = '0x7c22547779c8aa41bae79e03e8383a0befbcecf0';
export const LUSD_WRAPPER_L2 = '0x8a91e92fdd86e734781c38db52a390e1b99fba7c';
export const ETH_USD_L1_ADDR = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'

const EthWrapperKovanAddr = '0x44Af736495544a726ED15CB0EBe2d87a6bCC1832'

import EthUsdABI from "../abis/eth-usd-l1.json";
import EthWrapperABI from "../abis/eth-wrapper-l1.json";
import EthWrapperKovanABI from "../abis/eth-wrapper-kovan.json";

type ContractSetup = {
    addressOrName: string;
    contractInterface: ContractInterface;
}

export const EthUsdContract: ContractSetup = {
    addressOrName: ETH_USD_L1_ADDR,
    contractInterface: EthUsdABI,
}

export const EthWrapperL1Contract: ContractSetup = {
    addressOrName: ETH_WRAPPER_L1,
    contractInterface: EthWrapperABI,
}

export const EthWrapperL1KovanContract: ContractSetup = {
    addressOrName: EthWrapperKovanAddr,
    contractInterface: EthWrapperKovanABI,
}