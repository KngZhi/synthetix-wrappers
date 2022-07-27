
## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Rough Spec

Abstract:

The Grants Council is interested in funding a UI for the various Synthetix Wrappr contracts. The interface should be simple and allow for the minting/burning of synths.

Minting & Burning:

- sETH > ETH = on L1 & L2
- ETH > sETH = on L2 only
- LUSD > sUSD = L1 only
- sUSD > LUSD = L1 only

Docs:

https://docs.synthetix.io/integrations/ether-wrapper/

Contracts:

ETH Wrappr L1 - https://etherscan.io/address/0xC1AAE9d18bBe386B102435a8632C8063d31e747C
LUSD Wrappr L1 - https://etherscan.io/address/0x7c22547779c8aa41bae79e03e8383a0befbcecf0
ETH Wrappr L2 - https://optimistic.etherscan.io/address/0x6202a3b0be1d222971e93aab084c6e584c29db70
LUSD Wrappr L2 - https://optimistic.etherscan.io/address/0x8a91e92fdd86e734781c38db52a390e1b99fba7c 