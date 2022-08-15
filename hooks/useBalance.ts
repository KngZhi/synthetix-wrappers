import erc20ABI from 'abis/erc20.json'

import { useState, useEffect } from 'react'
import { Contract } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { useConnectorContext } from 'connector/Connector'
import { TokenInterface } from 'constants/token'
import { isL1State } from '../store/index'
import { useRecoilValue } from 'recoil'

function useBalance(token: TokenInterface) {
    const isL1 = useRecoilValue(isL1State)
    const [balance, setBalance] = useState('0')

    const { isWalletConnected, walletAddress, provider } = useConnectorContext()
    
    useEffect(() => {
        (async () => {
            if (!isWalletConnected) {
                setBalance(formatUnits(0, token.decimals))
                return
            }
            const address = isL1 ? token.address : token.ovmAddress
            const contract = new Contract(address, erc20ABI, provider)
            const balance = await contract.balanceOf(walletAddress)
            
            setBalance(formatUnits(balance.toString(), token.decimals))
        })()
    }, [token, isWalletConnected, isL1, provider, walletAddress])

    return balance
}

export default useBalance