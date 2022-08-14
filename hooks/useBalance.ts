import erc20ABI from 'abis/erc20.json'

import { useState, useEffect } from 'React'
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
            if (!isWalletConnected) return '0'
            const address = isL1 ? token.address : token.ovmAddress
            const contract = new Contract(address, erc20ABI, provider)
            const balance = await contract.balanceOf(walletAddress)
            
            setBalance(formatUnits(balance.toString(), token.decimals))
        })()
    }, [token, isWalletConnected, isL1, provider, walletAddress])

    return balance
}

export default useBalance