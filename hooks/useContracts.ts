import { BigNumber } from 'ethers'
import { TokenInterface } from '../constants/token'
import { useRecoilState } from 'recoil'
import { networkState } from '../store/index'
import { ContractSetup, L1_CONTRACT, L2_CONTRACT } from '../constants/contracts'
import { formatUnits } from 'ethers/lib/utils'
import { Ethereum } from 'constants/chains'
import {
  useContractRead as readContract,
  useContractWrite as useWriteContract,
} from './useBaseContract'

function getContractSetup(
  token: TokenInterface,
  chainId: string
): ContractSetup {
  return chainId === Ethereum.id
    ? (L1_CONTRACT[token.key])
    : (L2_CONTRACT[token.key])
}

type argsType = BigNumber[] | BigNumber | undefined

interface BaseContractInterface {
  burnFeeRate: string
  mintFeeRate: string
  capacity: string
  maxTokenAmount: string
  capacityUtilised: string
  calculateBurnFee?: () => Promise<string>
  calculateMintFee?: () => Promise<string>
  mint: (args: argsType) => void
  burn: (args: argsType) => void
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

export function useTokenContract(token: TokenInterface): BaseContractInterface {
  const [activeNetwork] = useRecoilState(networkState)
  const contractSetup = getContractSetup(token, activeNetwork?.id)
  const useRead = (functionName: Read) =>
    readContract({ contract: contractSetup, functionName })

  const useWrite = (functionName: Write) =>
    useWriteContract({
      contract: contractSetup,
      functionName: functionName,
    })

  const mint = useWrite(Write.MINT)
  const burn = useWrite(Write.BURN)
  const burnFeeRate = useRead(Read.BURN_FEE_RATE)
  const capacity = useRead(Read.CAPACITY)
  const mintFeeRate = useRead(Read.MINT_FEE_RATE)
  const capacityUtilised = useRead(Read.GET_RESERVES)
  const maxTokenAmount = useRead(Read.MAX_TOKEN_AMOUNT)
  const format = (data: BigNumber | undefined) =>
    data ? formatUnits(data, token.decimals) : '0'

  return {
    mint,
    burn,
    capacityUtilised: format(capacityUtilised),
    burnFeeRate: format(burnFeeRate),
    capacity: format(capacity),
    mintFeeRate: format(mintFeeRate),
    maxTokenAmount: format(maxTokenAmount),
  }
}
