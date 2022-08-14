import { BigNumber, Contract, Signer, providers } from 'ethers'
import { useConnectorContext } from 'connector/Connector'
import { isL1State } from '../store/index'
import { ContractSetup } from 'constants/contracts'
import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

interface payloadType {
    contract: ContractSetup,
    functionName: string,
    signerOrProvider?: Signer | providers.Provider | undefined,
    args?: string[],
}

export default function useContract({
    contract,
    functionName,
    signerOrProvider,
}: payloadType) {
    const baseContract = new Contract(
        contract.addressOrName,
        contract.contractInterface,
        signerOrProvider
    )

    return baseContract[functionName]

}

export function useContractRead({
    contract,
    functionName,
    args = []
}: payloadType) {
    const { isWalletConnected, provider, L1DefaultProvider, L2DefaultProvider, } = useConnectorContext()
    const [data, setData] = useState<BigNumber>()
    const isL1 = useRecoilValue(isL1State)

    const func = useContract({
        contract,
        functionName,
        signerOrProvider: isWalletConnected
            ? provider
            : (isL1 ? L1DefaultProvider : L2DefaultProvider),
    })
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

export function useContractWrite({
    contract,
    functionName,
}: payloadType) {
    const { signer } = useConnectorContext()
    const func = useContract({ contract, functionName, signerOrProvider: signer })

    return func
}