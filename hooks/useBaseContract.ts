import { BigNumber, Contract } from 'ethers'
import { useConnectorContext } from 'connector/Connector'
import { isL1State } from '../store/index'
import { ContractSetup } from 'constants/contracts'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface payloadType {
    contract: ContractSetup,
    functionName: string,
    args?: string[],
}

export default function useContract({
    contract,
    functionName,
    args,
}: payloadType) {
    const isL1 = useRecoilValue(isL1State)
    const { isWalletConnected, provider, L1DefaultProvider, L2DefaultProvider } = useConnectorContext()

    const baseContract = new Contract(
        contract.addressOrName,
        contract.contractInterface,
        isWalletConnected
            ? provider
            : (isL1 ? L1DefaultProvider : L2DefaultProvider),
    )

    return baseContract[functionName]

}

export function useContractRead({
    contract,
    functionName,
    args = []
}: payloadType) {
    const [data, setData] = useState<BigNumber>()

    const func = useContract({ contract, functionName })
    useEffect(() => {
        (async () => {
            try {
                const result = await func(...args)
                setData(result)

            } catch (error) {
                console.log(error)
            }
        })()
    }, [contract, functionName])
    return data
}