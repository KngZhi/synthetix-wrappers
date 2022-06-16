import { atom, selector } from 'recoil'
import { chain } from "wagmi";

export const walletAddressState = atom<string | null>({
  key: 'walletAddress',
  default: null,
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
  id: number,
  name: string,
  useOvm: boolean,
}

export const networkState = atom<Network | null>({
  key: 'network',
  default: {
    id: chain.mainnet.id,
    name: chain.mainnet.name,
  },
})
