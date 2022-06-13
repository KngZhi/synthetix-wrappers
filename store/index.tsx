import { atom, selector } from 'recoil';

export const walletAddressState = atom<string | null>({
	key: 'walletAddress',
	default: null,
});

export const isWalletConnectedState = selector<boolean>({
	key: 'isWalletConnected',
	get: ({ get }) => get(walletAddressState) != null,
});