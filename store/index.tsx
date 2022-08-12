import { atom, selector } from 'recoil'
import { chain } from 'wagmi'

export const walletAddressState = atom<string | undefined>({
  key: 'walletAddress',
  default: undefined,
})

export const isWalletConnectedState = selector<boolean>({
  key: 'isWalletConnected',
  get: ({ get }) => get(walletAddressState) != null,
})

export const balance = atom<string | null>({
  key: 'walletBalance',
  default: null,
})

export type Network = {
  id: number
  name: string
}

export const networkState = atom<Network>({
  key: 'network',
  default: {
    id: chain.mainnet.id,
    name: chain.mainnet.name,
  },
})

export const isL1State = selector<boolean>({
  key: 'isL1',
  get: ({ get }) =>
    [chain.kovan.name, chain.mainnet.name].includes(get(networkState)?.name),
})
