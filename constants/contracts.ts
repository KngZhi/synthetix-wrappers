export const ETH_WRAPPER_L1 = '0xC1AAE9d18bBe386B102435a8632C8063d31e747C';
export const ETH_WRAPPER_L2 = '0x6202a3b0be1d222971e93aab084c6e584c29db70';
export const LUSD_WRAPPER_L1 = '0x7c22547779c8aa41bae79e03e8383a0befbcecf0';
export const LUSD_WRAPPER_L2 = '0x8a91e92fdd86e734781c38db52a390e1b99fba7c';
export const ETH_USD_L1_ADDR = '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419'

const EthWrapperKovanAddr = '0x44Af736495544a726ED15CB0EBe2d87a6bCC1832'

import EthUsdABI from "../abis/eth-usd-l1.json";
import EthWrapperABI from "../abis/eth-wrapper-l1.json";
import EthWrapperKovanABI from "../abis/eth-wrapper-kovan.json";
import EthUSDL2ABI from "../abis/eth-usd-l2.json";
import SUSD_USD_L2_ABI from "../abis/susd-usd-l2.json";
import SUSD_USD_L1_ABI from "../abis/susd-usd-l1.json";

type ContractSetup = {
    addressOrName: string;
    contractInterface: ContractInterface;
}

export const ETH_USD_L1_CONTRACT: ContractSetup = {
    addressOrName: ETH_USD_L1_ADDR,
    contractInterface: EthUsdABI,
}

export const SUSD_USD_L1_Contract: ContractSetup = {
    addressOrName: '0x8e0b7e6062272B5eF4524250bFFF8e5Bd3497757',
    contractInterface: SUSD_USD_L1_ABI,
}

export const ETH_USD_L2_Contract: ContractSetup = {
    addressOrName: '0x13e3Ee699D1909E989722E753853AE30b17e08c5',
    contractInterface: EthUSDL2ABI,
}

export const SUSD_USD_L2_Contract: ContractSetup = {
    addressOrName: '0x7f99817d87baD03ea21E05112Ca799d715730efe',
    contractInterface: SUSD_USD_L2_ABI
}

export const EthWrapperL1Contract: ContractSetup = {
    addressOrName: ETH_WRAPPER_L1,
    contractInterface: EthWrapperABI,
}

export const EthWrapperL1KovanContract: ContractSetup = {
    addressOrName: EthWrapperKovanAddr,
    contractInterface: EthWrapperKovanABI,
}