import { atom, selector } from 'recoil'
import { Optimism, Chain } from 'constants/chains'

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

export const networkState = atom<Chain>({
  key: 'network',
  default: Optimism,
})

export const isL1State = selector<boolean>({
  key: 'isL1',
  get: ({ get }) => get(networkState).id === '0x1'
})
